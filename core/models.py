from __future__ import annotations

from django.db import models


class Lead(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    company = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField(blank=True)
    kvkk = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Lead"
        verbose_name_plural = "Leads"

    def __str__(self) -> str:  # pragma: no cover - simple representation
        return f"{self.company} <{self.email}>"


