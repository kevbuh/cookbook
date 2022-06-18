from django.urls import path
from recipes import views

urlpatterns = [
    path('recipes/', views.recipes_list),
    path('recipes/<int:pk>/', views.recipes_detail),
]