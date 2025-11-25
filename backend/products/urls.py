from django.urls import path
from .views import ProductListView, ProductDetailView, CategoryListView, CategoryProductsView, UserProductsView

urlpatterns = [
    path('', ProductListView.as_view(), name='products'),
    path('<int:id>/', ProductDetailView.as_view(), name='product-detail'),
    path('categories/', CategoryListView.as_view(), name='categories'),
    path('categories/<int:id>/products/', CategoryProductsView.as_view(), name='category-products'),
    path('my-listings/', UserProductsView.as_view(), name='user-products'),
]
