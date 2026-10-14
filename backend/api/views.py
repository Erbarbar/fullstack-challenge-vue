from rest_framework import generics, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import FilterSet, Filter
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.db.models import Count, Avg, Max, Min, F, Sum
from .models import UserProfile, Product
from .serializers import UserSerializer, ProductSerializer
from django.db.models.functions import Round

# 1. USER LIST VIEW (with Filtering and Sorting)
class UserListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'last_name', 'age', 'gender', 'university', 'state', 'role']

class ProductFilter(FilterSet):
    price_gte = Filter(field_name="price", lookup_expr='gte')
    price_lte = Filter(field_name="price", lookup_expr='lte')
    stock_min = Filter(field_name="stock", lookup_expr='gte')

    class Meta:
        model = Product
        fields = '__all__'

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter

# 2. USER STATISTICS VIEW (for the Charts)
@api_view(['GET'])
@permission_classes([AllowAny])
def user_stats_view(request):
    """Returns distribution of users by State and University for charts."""
    state_dist = UserProfile.objects.values('state').annotate(count=Count('id')).order_by('-count')
    univ_dist = UserProfile.objects.values('university').annotate(count=Count('id')).order_by('-count')

    return Response({
        "states": {item['state']: item['count'] for item in state_dist},
        "universities": {item['university']: item['count'] for item in univ_dist},
        "total_users": UserProfile.objects.count()
    })



# 3. PRODUCT ANALYTICS VIEW (The complex one)
@api_view(['GET'])
@permission_classes([AllowAny])
def product_analytics_view(request):
    """Returns all the complex aggregated product metrics."""

    # Base queryset for all products (The full catalog)
    all_products = Product.objects.all()

    # The "Availability" Filter: Only count products that are actually in stock
    available_products = Product.objects.filter(stock__gt=0)

    # 1. Top brands based on reviews/rating (From the full catalog)
    top_brands = Product.objects.values('brand').annotate(
    avg_rating=Round(Avg('reviews__rating'), 2)
).order_by('-avg_rating')

    # 2. Available products by categories (ONLY counts those in stock)
    category_counts = available_products.values('category').annotate(
        count=Count('id')
    )

    # 3. Price range by category (Max difference across the whole catalog)
    price_diffs = Product.objects.values('category').annotate(
        max_p=Max('price'),
        min_p=Min('price')
    ).annotate(diff=F('max_p') - F('min_p')).order_by('-diff')

    # 4. Stock by category
    category_stock = Product.objects.values('category').annotate(
        stock=Sum('stock')
    ).order_by('-stock')

    # 5. Total inventory (The sum of all units available to sell)
    total_stock = available_products.aggregate(total=Sum('stock'))['total'] or 0

    return Response({
        "top_brands": {item['brand']: item['avg_rating'] for item in top_brands},
        "category_counts": {item['category']: item['count'] for item in category_counts},
        "price_diffs": {item['category']: item['diff'] for item in price_diffs},
        "category_stock": {item['category']: item['stock'] for item in category_stock},
        "total_inventory": total_stock
    })