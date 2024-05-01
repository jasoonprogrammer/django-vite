from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import serializers
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from .permissions import *
from django.utils import timezone
from rest_framework.pagination import PageNumberPagination
# Create your views here.
    
class CustomTokenObtainView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class ProductCreateAPI(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 10000

class ProductListAPI(generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = LargeResultsSetPagination
    authentication_classes = []
    queryset = Product.objects.all()

class ProductUpdateAPI(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def put(self, request, pk, *args, **kwargs):
        im = request.data['image']
        product = Product.objects.get(pk = pk)
        product.image = im
        product.save()
        serializer = ProductSerializer(product)
        return Response(serializer.data)
 
class FeatureImagePagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 10000

class FeatureProductListAPI(generics.ListAPIView):
    authentication_classes = []
    pagination_class = FeatureImagePagination
    serializer_class = ProductSerializer

    def get_queryset(self):
        feature_products = FeatureProduct.objects.all()
        feature_products = [x.product for x in feature_products if x.max_display_count > x.display_count]
        for item in feature_products:
            item.active = True
            item.save()
        return feature_products
    
class CategoryListAPI(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


@permission_classes([IsAuthenticated])
@api_view(["GET"])
def update_count(request, pk):
    item = FeatureProduct.objects.filter(product__id = pk)
    item = item.first()
    item.display_count += 1
    if item.display_count >= item.max_display_count:
        item.active = False
    item.save()
    serializer = FetureProductSerializer(item)
    return Response(serializer.data)
