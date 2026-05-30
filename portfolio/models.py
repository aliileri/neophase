from __future__ import annotations
from django.db import models


class Asset(models.Model):
    ASSET_TYPES = [
        ('ETF', 'ETF'),
        ('STOCK', 'Hisse'),
        ('FUND', 'Fon'),
        ('GOLD', 'Altın'),
    ]
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=20, unique=True)
    asset_type = models.CharField(max_length=10, choices=ASSET_TYPES)
    quantity = models.DecimalField(max_digits=14, decimal_places=4)
    avg_cost = models.DecimalField(max_digits=14, decimal_places=4)

    class Meta:
        ordering = ['asset_type', 'symbol']

    def __str__(self) -> str:
        return f"{self.symbol} ({self.name})"


class DailyPrice(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name='prices')
    date = models.DateField()
    price_eur = models.DecimalField(max_digits=14, decimal_places=4)
    change_pct = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)

    class Meta:
        unique_together = ('asset', 'date')
        ordering = ['-date']

    def __str__(self) -> str:
        return f"{self.asset.symbol} {self.date}: {self.price_eur} EUR"


class MorningReport(models.Model):
    date = models.DateField(unique=True)
    full_analysis = models.JSONField(default=dict)
    total_portfolio_eur = models.DecimalField(max_digits=16, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self) -> str:
        return f"MorningReport {self.date}: {self.total_portfolio_eur} EUR"
