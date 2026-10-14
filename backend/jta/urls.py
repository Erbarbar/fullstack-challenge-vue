from django.urls import path, include
from api.views import UserListViewSet, ProductViewSet, user_stats_view, product_analytics_view
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserListViewSet)
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('api/users/stats/', user_stats_view, name='user-stats'),
    path('api/products/analytics/', product_analytics_view, name='product-analytics'),
    path('api/', include(router.urls)),
]