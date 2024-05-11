from rest_framework import serializers
from .models import Cart, CartItem
from product.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  # Serializador del producto asociado

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'created_at']


class CartSerializer(serializers.ModelSerializer):
    # Serializador de los elementos del carrito
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'created_at']
