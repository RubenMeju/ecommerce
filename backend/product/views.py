from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Product, Attribute
from .serializers import ProductSerializer, AttributeSerializer


class AttributeViewSet(viewsets.ModelViewSet):
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer
   # filterset_fields = ['slug', 'category']


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_fields = ['category', 'slug']

    def create(self, request, *args, **kwargs):
        # Extraer los datos de los atributos del request.data
        attributes_data = request.data.pop('attributes', [])

        # Llamar al método create() de la clase base para crear el producto
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Procesar los atributos y asociarlos con el producto creado
        product = serializer.instance
        for attribute_data in attributes_data:
            attribute_name = attribute_data['attribute_name']
            value = attribute_data['value']

            # Buscar o crear el objeto Attribute
            attribute, created = Attribute.objects.get_or_create(
                attribute_name=attribute_name,
                value=value
            )

            # Asociar el objeto Attribute con el producto
            product.attributes.add(attribute)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
