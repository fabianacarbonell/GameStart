from rest_framework import generics, permissions
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from rest_framework.response import Response

class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return cart

class AddCartItemView(generics.CreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data['product']
        quantity = request.data.get('quantity', 1)
        item, created = CartItem.objects.get_or_create(cart=cart, product_id=product_id)
        if not created:
            item.quantity += int(quantity)
            item.save()
        return Response(CartSerializer(cart).data)
