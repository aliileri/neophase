from django.contrib import admin
from .models import Asset, DailyPrice, MorningReport


@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('symbol', 'name', 'asset_type', 'quantity', 'avg_cost')
    list_filter = ('asset_type',)
    search_fields = ('symbol', 'name')


@admin.register(DailyPrice)
class DailyPriceAdmin(admin.ModelAdmin):
    list_display = ('asset', 'date', 'price_eur', 'change_pct')
    list_filter = ('date', 'asset__asset_type')
    ordering = ('-date',)


@admin.register(MorningReport)
class MorningReportAdmin(admin.ModelAdmin):
    list_display = ('date', 'total_portfolio_eur', 'created_at')
    readonly_fields = ('full_analysis', 'created_at')
