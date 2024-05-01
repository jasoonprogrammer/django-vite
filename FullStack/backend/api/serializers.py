from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *
from rest_framework.response import Response
import datetime
from django.utils import timezone
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Customizes JWT default Serializer to add more information about user"""
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['is_superuser'] = user.is_superuser
        token['is_staff'] = user.is_staff
        token['full_name'] = f"{user.first_name} {user.last_name}"
        token['image_path'] = f"http://localhost:8000/" + user.image.url

        return token
    
class SaleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sale
        fields = ['id', 'product', 'quantity']

class TransactionSerializer(serializers.ModelSerializer):
    sales = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = ['id', 'date_time', "sales"]
        read_only_fields = ['id', "sales"]

    def get_sales(self, obj):
        sales = obj.sale_set.all()
        serializer = SaleSerializer(sales, many = True)
        return serializer.data

class ProductSerializer(serializers.ModelSerializer):
    image_path = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'image', 'quantity', 'name', 'price', 'image_path', 'plu']
        read_only_fields = ['image_path']

    def get_image_path(self, obj):
        return obj.image.url
    
class FetureProductSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    class Meta:
        model = FeatureProduct
        fields = "__all__"

    def get_product(self, obj):
        product = obj.product
        serializer = ProductSerializer(product)
        return serializer.data
    
class CategorySerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['name', 'thumbnail']

    def get_thumbnail(self, obj):
        products = obj.product_set.all().order_by("?")[0]
        return products.image.url