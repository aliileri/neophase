from __future__ import annotations

import json
import logging
import re
from datetime import date

import requests
from django.conf import settings
from django.core.management.base import BaseCommand

from portfolio.models import Asset, DailyPrice, MorningReport

logger = logging.getLogger(__name__)

FINNHUB_BASE = "https://finnhub.io/api/v1/quote"
TEFAS_BASE = "https://www.tefas.gov.tr/api/DB/BindHistoryInfo"


class Command(BaseCommand):
    help = "Fiyatları çek, Claude analizi yap, MorningReport kaydet"

    def handle(self, *args, **options):
        today = date.today()
        self.stdout.write(f"[morning_brief] {today} başladı")

        # 1. Döviz kurları
        eur_usd = self._finnhub_price("OANDA:EUR_USD")
        eur_try = self._finnhub_price("OANDA:EUR_TRY")
        eur_gbp = self._finnhub_price("OANDA:EUR_GBP")

        if eur_usd is None:
            logger.error("EUR/USD kuru alınamadı, USD varlıklar atlanacak")
        if eur_try is None:
            logger.error("EUR/TRY kuru alınamadı, TEFAS fonları atlanacak")
        if eur_gbp is None:
            logger.error("EUR/GBP kuru alınamadı, GBP varlıklar atlanacak")

        # 2. Her varlık için fiyat çek
        prices: dict[Asset, tuple[float, float | None]] = {}

        for asset in Asset.objects.all():
            result = self._fetch_asset_price(asset, eur_usd, eur_try, eur_gbp)
            if result is not None:
                prices[asset] = result  # (price_eur, change_pct)

        # 3. DailyPrice kaydet
        for asset, (price_eur, change_pct) in prices.items():
            DailyPrice.objects.update_or_create(
                asset=asset,
                date=today,
                defaults={"price_eur": round(price_eur, 4), "change_pct": change_pct},
            )

        # 4. Toplam portföy değeri
        total_eur = sum(
            float(asset.quantity) * price_eur
            for asset, (price_eur, _) in prices.items()
        )

        # 5. Claude analizi
        analysis = self._claude_analysis(prices)

        # 6. MorningReport kaydet
        MorningReport.objects.update_or_create(
            date=today,
            defaults={
                "full_analysis": analysis,
                "total_portfolio_eur": round(total_eur, 2),
            },
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"[morning_brief] Tamamlandı. Toplam: {total_eur:.2f} EUR, "
                f"{len(prices)} varlık işlendi."
            )
        )

    # ------------------------------------------------------------------ #
    # Fiyat çekiciler                                                      #
    # ------------------------------------------------------------------ #

    def _finnhub_price(self, symbol: str) -> float | None:
        """Finnhub'dan sadece mevcut fiyatı döner. Kur çekmek için kullanılır."""
        result = self._finnhub_quote(symbol)
        return result[0] if result is not None else None

    def _finnhub_quote(self, symbol: str) -> tuple[float, float | None] | None:
        """(price, change_pct) döner. Hata → None."""
        try:
            r = requests.get(
                FINNHUB_BASE,
                params={"symbol": symbol, "token": settings.FINNHUB_API_KEY},
                timeout=10,
            )
            r.raise_for_status()
            data = r.json()
            price = data.get("c")
            if price is None:
                logger.warning("Finnhub %s: fiyat boş", symbol)
                return None
            change_pct = data.get("dp")
            return float(price), (float(change_pct) if change_pct is not None else None)
        except Exception as exc:
            logger.error("Finnhub %s hatası: %s", symbol, exc)
            return None

    def _fetch_tefas_price(self, fund_code: str, eur_try: float) -> tuple[float, float | None] | None:
        """TEFAS'tan TRY fiyat çekip EUR'a çevirir. Hata / boş veri → None."""
        try:
            today_str = date.today().strftime("%d.%m.%Y")
            r = requests.get(
                TEFAS_BASE,
                params={
                    "fontip": "YAT",
                    "fonkod": fund_code,
                    "bastarih": today_str,
                    "bittarih": today_str,
                },
                timeout=10,
            )
            r.raise_for_status()
            data = r.json()
            rows = data.get("data", [])
            if not rows:
                logger.warning("TEFAS %s: veri yok (tatil/hafta sonu?)", fund_code)
                return None
            price_try = float(rows[0]["FIYAT"])
            price_eur = price_try / eur_try
            return price_eur, None  # TEFAS değişim yüzdesi farklı hesaplanır
        except Exception as exc:
            logger.error("TEFAS %s hatası: %s", fund_code, exc)
            return None

    def _fetch_asset_price(
        self,
        asset: Asset,
        eur_usd: float | None,
        eur_try: float | None,
        eur_gbp: float | None,
    ) -> tuple[float, float | None] | None:
        """Asset tipine göre doğru kaynaktan fiyat çeker, EUR'a çevirir."""
        symbol = asset.symbol

        if asset.asset_type == "FUND":
            if eur_try is None:
                return None
            return self._fetch_tefas_price(symbol, eur_try)

        if asset.asset_type == "GOLD":
            # XAUUSD → USD/oz, EUR/USD kuruna böl
            if eur_usd is None:
                return None
            result = self._finnhub_quote(symbol)
            if result is None:
                return None
            price_usd, change_pct = result
            return price_usd / eur_usd, change_pct

        # ETF veya STOCK
        result = self._finnhub_quote(symbol)
        if result is None:
            return None
        raw_price, change_pct = result

        # London Stock Exchange (.L) → GBP (pence olabilir)
        if symbol.endswith(".L"):
            if eur_gbp is None:
                return None
            # LSE prices: Finnhub returns GBp (pence) for many UK stocks.
            # Heuristic: divide by 100 if price > 100. Verify actual Finnhub output
            # for your specific symbols — some LSE ETFs (e.g. VGWD.L) may be USD-denominated.
            price_gbp = raw_price / 100 if raw_price > 100 else raw_price
            return price_gbp / eur_gbp, change_pct

        # Alman Xetra (.DE) → EUR
        if symbol.endswith(".DE"):
            return raw_price, change_pct

        # ABD hisseleri (PATH, AI, SYM) → USD
        if eur_usd is None:
            return None
        return raw_price / eur_usd, change_pct

    # ------------------------------------------------------------------ #
    # Claude analizi                                                       #
    # ------------------------------------------------------------------ #

    def _claude_analysis(self, prices: dict[Asset, tuple[float, float | None]]) -> dict:
        """Tüm fiyatları Claude'a gönder, web_search ile analiz yaptır."""
        try:
            text = ""  # always defined before json.loads
            import anthropic

            price_lines = []
            for asset, (price_eur, change_pct) in prices.items():
                chg = f"{change_pct:+.2f}%" if change_pct is not None else "N/A"
                price_lines.append(
                    f"- {asset.symbol} ({asset.name}, {asset.get_asset_type_display()}): "
                    f"{price_eur:.4f} EUR  Değişim: {chg}"
                )

            prompt = (
                "Sen bir portföy analisti asistanısın. Aşağıdaki portföy fiyatlarını ve "
                "güncel piyasa haberlerini (web_search aracını kullanarak) değerlendirerek "
                "her varlık için AL / SAT / TUT kararı ve kısa gerekçe ver.\n\n"
                "Portföy fiyatları (EUR):\n"
                + "\n".join(price_lines)
                + "\n\n"
                "Lütfen sonucu SADECE aşağıdaki JSON formatında döndür, başka hiçbir metin ekleme:\n"
                "{\n"
                '  "SYMBOL": {"decision": "AL|SAT|TUT", "rationale": "kısa gerekçe"},\n'
                '  ...,\n'
                '  "summary": "genel portföy değerlendirmesi (2-3 cümle)"\n'
                "}"
            )

            client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
            response = client.messages.create(
                model="claude-opus-4-7",
                max_tokens=4096,
                tools=[{"type": "web_search_20250305", "name": "web_search"}],
                messages=[{"role": "user", "content": prompt}],
            )

            # İçerik bloklarından metin topla
            for block in response.content:
                if hasattr(block, "text"):
                    text += block.text

            # JSON parse et
            text = text.strip()
            # Extract JSON object from response (handles ```json fences and leading prose)
            json_match = re.search(r'\{.*\}', text, re.DOTALL)
            if json_match:
                text = json_match.group(0)

            return json.loads(text)

        except json.JSONDecodeError as exc:
            logger.error("Claude yanıtı JSON parse edilemedi: %s", exc)
            return {"raw": text, "error": "json_parse"}
        except Exception as exc:
            logger.error("Claude analizi hatası: %s", exc)
            return {"error": str(exc)}
