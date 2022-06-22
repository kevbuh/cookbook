from rest_framework import serializers
from recipes.models import Recipes, Category, Comment, Review
from django.db.models import Avg

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class RecipesSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, required=False)
    category = CategorySerializer(many=True, required=False)
    comments = CommentSerializer(many=True, required=False)

    avg_rating = serializers.SerializerMethodField()

    class Meta:
        model = Recipes
        fields = '__all__'

    def get_avg_rating(self, obj):
        return obj.reviews.all().aggregate(Avg('rate'))['rate__avg']
