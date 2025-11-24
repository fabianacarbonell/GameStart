from rest_framework import generics, permissions
from .models import Review
from .serializers import ReviewSerializer

class ProductReviewListView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return Review.objects.filter(product_id=product_id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, product_id=self.kwargs['product_id'])
