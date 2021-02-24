from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product
from base.serializers import ProductSerializer

from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        message = {
            'detail': "Product doesn't exists, or other error occurred"
        }
        return Response(message, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        product.delete()
        return Response("Product deleted", status=status.HTTP_200_OK)
    except:
        message = {
            'detail': "Some error occurred"
        }
        return Response(message, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    try:
        user = request.user
        product = Product.objects.create(
            user=user,
            name="Sample name",
            price=0,
            brand="Sample brand",
            countInStock=0,
            category="Sample category",
            description=""
        )

        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        message = {
            'detail': "Some error occurred"
        }
        return Response(message, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        data = request.data
        product = Product.objects.get(_id=pk)

        product.name = data['name']
        product.price = data['price']
        product.brand = data['brand']
        product.countInStock = data['countInStock']
        product.category = data['category']
        product.description = data['description']

        product.save()

        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        message = {
            'detail': "Product doesn't exists, or other error occurred"
        }
        return Response(message, status=status.HTTP_404_NOT_FOUND)