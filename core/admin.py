from django.contrib import admin

from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("created_at", "company", "email")
    list_filter = ("created_at",)
    search_fields = ("company", "email", "message")


