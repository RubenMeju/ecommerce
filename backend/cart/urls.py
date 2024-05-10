from django.urls import path
from . import views

urlpatterns = [
    path('carts/', views.CartListCreateAPIView.as_view(), name='cart_list'),
    path('carts/<int:pk>/',
         views.CartRetrieveUpdateDestroyAPIView.as_view(), name='cart_detail'),
    path('cart_items/', views.CartItemListCreateAPIView.as_view(),
         name='cart_item_list'),
    path('cart_items/<int:pk>/',
         views.CartItemRetrieveUpdateDestroyAPIView.as_view(), name='cart_item_detail'),
]
