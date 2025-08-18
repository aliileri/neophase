# NeoPhase — Minimal Tek Sayfa (Django)

Django 5+ ile kurulu, tek sayfa etkileşimli bir mini site. Her tık farklı bir mikro-deneyim tetikler.

## Kurulum

```bash
python -m venv .venv
# Windows PowerShell
. .venv/Scripts/Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Tarayıcıda `http://127.0.0.1:8000/` adresini açın.

## Yapı

```
neophase/
  manage.py
  neophase/settings.py, urls.py, asgi.py, wsgi.py
  core/
    views.py, urls.py
    templates/core/index.html
    static/core/{logo.svg, app.css, app.js, og.png}
```

## Notlar
- Tailwind CDN kullanılıyor.
- `prefers-reduced-motion: reduce` desteği mevcut; animasyonlar sadeleşir.
- Form gönderimi demo amaçlıdır, konsola yazar ve başarı mesajı gösterir.



