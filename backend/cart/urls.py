from django.urls import path
from . import views

urlpatterns = [
    path('cart/add_to_cart/', views.AddToCartAPIView.as_view(), name='add_to_cart'),
    path('cart/cart/', views.CartListAPIView.as_view(), name='cart_list'),
]
