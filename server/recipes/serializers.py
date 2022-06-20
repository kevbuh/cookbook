from rest_framework import serializers
from recipes.models import Recipes, Category, Comment

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class RecipesSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True, required=False)
    comments = CommentSerializer(many=True, required=False)

    class Meta:
        model = Recipes
        fields = '__all__'
