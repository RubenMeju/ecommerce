from rest_framework import generics, permissions
from .models import Cart
from .serializers import CartSerializer, CartItemSerializer


class AddToCartAPIView(generics.CreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        product_id = self.request.data.get('product_id')
        cart = Cart.objects.filter(user=user).first()
        if not cart:
            cart = Cart.objects.create(user=user)
        serializer.save(cart=cart, product_id=product_id)


class CartListAPIView(generics.ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)
