from rest_framework import serializers
from .models import Cart, CartItem
from product.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):
    # Usa el serializer del modelo Product para serializar el producto
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'created_at']


class CartSerializer(serializers.ModelSerializer):
    # Indica que los items son solo para lectura
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'created_at']
