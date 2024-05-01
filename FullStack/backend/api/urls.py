from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('token/', views.CustomTokenObtainView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('product/create/', views.ProductCreateAPI.as_view()),
    path('product/list', views.ProductListAPI.as_view()),
    path('product/update/<int:pk>', views.ProductUpdateAPI.as_view()),
    path('product/feature/list', views.FeatureProductListAPI.as_view()),
    path('product/feature/count/update/<int:pk>', views.update_count),
    path('category/list', views.CategoryListAPI.as_view())
    
]