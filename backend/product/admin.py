from django.contrib import admin
from .models import Attribute, Product


@admin.register(Attribute)
class AttributeAdmin(admin.ModelAdmin):
    list_display = ['attribute_name', 'value']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description', 'price']
