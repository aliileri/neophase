# Sevo Dienstleistungen — Landing Page Design Spec

**Tarih:** 2026-06-01  
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS v3 · Framer Motion  
**Deployment:** PythonAnywhere — statik export (`output: 'export'`, `out/` klasörü upload)  
**WhatsApp:** +49 1522 9003063  

---

## 1. Proje Özeti

Ulm merkezli çok hizmetli yerel işletme Sevo Dienstleistungen için yüksek dönüşümlü, tek sayfa pazarlama sitesi. 5 ana section: Hero, Servisler, Sosyal Kanıt, CTA, Footer (Impressum + Datenschutz modal).

---

## 2. Renk Paleti & Tema

| Token | Değer | Kullanım |
|---|---|---|
| `navy` | `#0a192f` | Arka plan, primary |
| `gold` | `#d4af37` | Vurgu, border, hover |
| `white` | `#fafafa` | Metin, elementler |
| `whatsapp` | `#25d366` | Doğrudan aksiyon butonları |

Tailwind config'e özel token olarak eklenir. Tüm component'lar bu değişkenleri kullanır.

---

## 3. Klasör Yapısı

```
sevo-web/
├── public/assets/
│   ├── hero.png
│   ├── hero-exploded.png
│   └── hero-transition.mp4
├── src/app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── components/
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── ServicesSection.tsx
│       ├── ServiceCard.tsx
│       ├── ReviewsSection.tsx
│       ├── CtaSection.tsx
│       ├── Footer.tsx
│       ├── WhatsAppFab.tsx
│       ├── ImpressumModal.tsx
│       └── DatenschutzModal.tsx
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 4. Section Detayları

### 4.1 Navbar
- Logo: "SEVO" wordmark (gold renk, bold sans-serif)
- Sağda: "Jetzt Anfragen" butonu (gold border, hover fill)
- Scroll'da arka plan: `navy/90` + backdrop-blur
- Mobilde: hamburger yok — sadece logo + tek buton (thumb-friendly)

### 4.2 Hero Section
- Sol: H1 "Alles aus einer Hand!", alt başlık, "Unverbindliche Anfrage" CTA butonu (gold fill), WhatsApp hızlı arama linki
- Sağ: `hero-transition.mp4` — `autoPlay muted loop playsInline`, `poster={hero.png}` (fallback). Rounded corner, hafif gold border glow.
- Scroll indicator: animated chevron aşağı
- Mobil: video üste gelir, metin alta — tam genişlik stack
- Animasyon: Framer Motion `fadeInUp` sol metin, `fadeInRight` video

### 4.3 Servisler Section (4 Kart)
Başlık: "Unsere Leistungen"

| Kart | İkon | Başlık | Açıklama |
|---|---|---|---|
| 1 | 🚗 | Kfz-Service & Handel | Reparatur, Inspektion, An- und Verkauf von Fahrzeugen in Ulm |
| 2 | 🏠 | Hausrenovierung | Trockenbau, Malerarbeiten, Bodenbelag – alles aus einer Hand |
| 3 | 📦 | Gebrauchtwarenhandel | Möbel, Haushaltsgeräte – günstig kaufen & verkaufen in Ulm |
| 4 | ✨ | Professionelle Reinigung | Büro-, Haushalts- und Endreinigung nach höchstem Standard |

Her kart:
- Navy bg, gold top-border (4px)
- Hover: 3D tilt (Framer Motion `rotateX/Y` + `scale(1.03)`)
- "Via WhatsApp anfragen" butonu (whatsapp green), direkt `wa.me/49152290030630?text=...` linki ile servis adı pre-fill
- Grid: 2×2 desktop, 1 kolon mobil

### 4.4 Reviews Section
Başlık: "Was unsere Kunden sagen"

5 simüle yorum — Ulm lokasyonlu Almanca isimler:

| İsim | Puan | Yorum |
|---|---|---|
| Klaus M. | ⭐⭐⭐⭐⭐ | "Super schnelle Kfz-Reparatur, fairer Preis. Gerne wieder!" |
| Sabine K. | ⭐⭐⭐⭐⭐ | "Badezimmer renoviert in 3 Tagen – sauber und professionell." |
| Thomas B. | ⭐⭐⭐⭐⭐ | "Tolle Gebrauchtware zum fairen Preis. Sehr empfehlenswert!" |
| Monika R. | ⭐⭐⭐⭐⭐ | "Endreinigung nach Mietende – keine Beanstandungen. Danke!" |
| Stefan H. | ⭐⭐⭐⭐⭐ | "Zuverlässig, pünktlich, kommunikativ. Sevo macht alles möglich." |

Layout: horizontal scroll carousel (mobil) / 3+2 grid (desktop). Frosted glass kart efekti.

### 4.5 CTA Section
- Büyük başlık: "Bereit für Ihren nächsten Auftrag?"
- Alt: "Wir sind in Ulm und Umgebung für Sie da."
- İki buton: "Jetzt WhatsApp schreiben" (whatsapp green) + "Anrufen" (gold border, tel: link)
- Arka plan: hafif navy gradient + subtle gold particle efekti (CSS only, 6-8 animated dot)

### 4.6 Footer
- Sol: Logo, kısa açıklama, adres (Ulm)
- Sağ: "Impressum" ve "Datenschutz" linkleri (modal açar)
- Alt bar: © 2025 Sevo Dienstleistungen

**ImpressumModal:**  
TKG § 5 uyumlu — Angaben gemäß § 5 TMG. Şirket adı, adres (Ulm), iletişim bilgileri, vergi numarası alanları.

**DatenschutzModal:**  
DSGVO uyumlu — veri toplanmıyor (statik site), yalnızca WhatsApp linki dış servis, Art. 13 DSGVO bilgilendirmesi.

### 4.7 WhatsApp FAB (Sticky)
- Sağ alt köşe, `fixed bottom-6 right-6`
- Yuvarlak yeşil buton, WhatsApp ikonlu
- Metin: "Schnellanfrage via WhatsApp"
- Pulse animasyonu (CSS ring)
- Mobilde thumb-reach bölgesi — 60px × 60px minimum

---

## 5. Animasyon Stratejisi

- **Framer Motion** `useInView` ile section girişi (fadeUp, stagger)
- Servis kartları: `whileHover={{ rotateX: 5, rotateY: -5, scale: 1.03 }}`
- Hero video: CSS `border-glow` pulse
- WhatsApp FAB: CSS `@keyframes ping` ring efekti
- `hero-exploded.png`: video yüklenemezse fallback olarak kullanılır (JS ile video.error event)

---

## 6. Mobil Optimizasyon

- Hero: video üste (max-h-60), metin alta
- Servisler: tek kolon
- Reviews: horizontal scroll (`overflow-x: scroll`, snap)
- Tüm butonlar minimum 48px height (thumb-friendly)
- FAB: `bottom-6 right-4` — standart thumb bölgesi

---

## 7. Next.js Config

```ts
// next.config.ts
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
}
```

Build: `npm run build` → `out/` klasörü PythonAnywhere'e upload.

---

## 8. Dependencies

```json
{
  "next": "14.x",
  "react": "18.x",
  "framer-motion": "^11",
  "tailwindcss": "^3",
  "typescript": "^5",
  "@types/react": "^18"
}
```
