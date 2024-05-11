from django.contrib import admin
from .models import Cart, CartItem


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('id', 'user__username')
    date_hierarchy = 'created_at'


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'product', 'quantity', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('id', 'cart__id', 'product__name')
    date_hierarchy = 'created_at'
