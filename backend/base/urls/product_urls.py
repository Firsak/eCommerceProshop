from django.urls import path
from base.views import product_views

urlpatterns = [

    path('', product_views.getProducts, name='products'),
    path('create/', product_views.createProduct, name='product-create'),
    path('<str:pk>/', product_views.getProduct, name='product'),

    path('delete/<str:pk>/', product_views.deleteProduct, name='product-delete'),
    path('update/<str:pk>/', product_views.updateProduct, name='product-update'),
]