from __future__ import annotations

from datetime import date

from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from .models import Asset, DailyPrice, MorningReport


@login_required(login_url='/admin/login/')
def dashboard(request):
    today = date.today()

    # Son rapor
    report = MorningReport.objects.first()  # ordering='-date' → en yeni

    # Tüm varlıklar + bugünkü fiyat + analiz kararı
    assets = Asset.objects.all()
    analysis = report.full_analysis if report else {}

    asset_rows = []
    for asset in assets:
        price_obj = DailyPrice.objects.filter(asset=asset, date=today).first()
        if price_obj is None:
            # Bugün veri yoksa son fiyatı göster
            price_obj = DailyPrice.objects.filter(asset=asset).first()

        decision_data = analysis.get(asset.symbol, {})
        asset_rows.append({
            "asset": asset,
            "price": price_obj,
            "decision": decision_data.get("decision", ""),
            "rationale": decision_data.get("rationale", ""),
        })

    # Son 7 rapor (tarihçe)
    history = MorningReport.objects.all()[:7]

    context = {
        "report": report,
        "asset_rows": asset_rows,
        "history": history,
        "summary": analysis.get("summary", ""),
        "today": today,
    }
    return render(request, "portfolio/dashboard.html", context)
