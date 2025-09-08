from __future__ import annotations

from dataclasses import dataclass
from django import forms
from django.contrib import messages
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from django.utils import timezone
from django.core.mail import EmailMessage


class ContactForm(forms.Form):
    company = forms.CharField(
        label='Şirket adı',
        max_length=120,
        required=True,
        widget=forms.TextInput(attrs={'class': 'control', 'placeholder': 'Örn. NeoPhase A.Ş.'}),
    )
    email = forms.EmailField(
        label='E-posta',
        required=True,
        widget=forms.EmailInput(attrs={'class': 'control', 'placeholder': 'ornek@firma.com'}),
    )
    message = forms.CharField(
        label='Mesaj',
        required=False,
        max_length=240,
        widget=forms.Textarea(attrs={'rows': 3, 'class': 'control', 'placeholder': 'Opsiyonel kısa not'}),
    )
    kvkk = forms.BooleanField(
        label='KVKK onayını kabul ediyorum',
        required=True,
        error_messages={'required': 'KVKK onayını kabul etmelisiniz.'},
    )


def index(request: HttpRequest) -> HttpResponse:
    form = ContactForm(request.POST or None)
    success = False
    if request.method == 'POST':
        if form.is_valid():
            messages.success(request, 'Teşekkürler! 24 saat içinde dönüş yapacağız.')
            success = True
            # E-posta gönderimi
            cleaned = form.cleaned_data
            subject = 'NeoPhase — Yeni pilot başvuru'
            lines = [
                'Yeni bir pilot başvuru alındı:\n',
                f"Şirket: {cleaned.get('company')}",
                f"E-posta: {cleaned.get('email')}",
                f"Mesaj: {cleaned.get('message') or '-'}",
                f"Tarih: {timezone.now().strftime('%Y-%m-%d %H:%M:%S %Z')}",
                '',
                'Bu e-posta form üzerinden otomatik gönderilmiştir.'
            ]
            body = '\n'.join(lines)
            email = EmailMessage(
                subject=subject,
                body=body,
                to=['info@neophasesoftware.com'],
                headers={'Reply-To': cleaned.get('email')}
            )
            try:
                email.send(fail_silently=True)
            except Exception:  # güvenli tarafta kal: logla, uygulamayı bozma
                pass
            # Basit log
            print('[NeoPhase] Yeni başvuru:', cleaned)  # noqa: T201
            form = ContactForm()  # formu sıfırla
        else:
            messages.error(request, 'Lütfen gerekli alanları doldurun.')

    context = {
        'form': form,
        'year': timezone.now().year,
        'success': success,
        'initial_view': 'cta' if request.method == 'POST' else 'who',
    }
    return render(request, 'core/index.html', context)


