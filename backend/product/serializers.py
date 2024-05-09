from rest_framework import serializers
from .models import Product, Attribute


class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ('attribute_name', 'value')


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(read_only=True)
    attributes = AttributeSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
