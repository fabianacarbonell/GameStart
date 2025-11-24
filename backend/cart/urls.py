from django.urls import path
from .views import CartView, AddCartItemView

urlpatterns = [
    path('', CartView.as_view(), name='cart'),
    path('add/', AddCartItemView.as_view(), name='cart-add'),
]
