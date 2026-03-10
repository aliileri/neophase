from django.urls import path
from .views import index, st_automobile


urlpatterns = [
    path('', index, name='index'),
    path('st/', st_automobile, name='st_automobile'),
]





