from rest_framework import serializers
from .models import UserProfile, Product, Review

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    class Meta:
        model = UserProfile
        exclude = ['first_name', 'last_name']

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rating', 'reviewer_name', 'comment']
        
class ProductSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = [
            'product_id', 
            'title', 
            'brand', 
            'category',
            'price', 
            'stock', 
            'image', 
            'reviews' 
        ]