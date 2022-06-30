from rest_framework import serializers
from recipes.models import Recipes, Category, Comment, Review, Favorites, Ingredients, GroceryLists
from django.db.models import Avg

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class GroceryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryLists
        fields = '__all__'

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class LikedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = '__all__'

class RecipesSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, required=False)
    category = CategorySerializer(many=True, required=False)
    comments = CommentSerializer(many=True, required=False)
    # ingredients = IngredientSerializer(many=True, required=False)

    # uploaded_images = UploadedImageSerializer(many=True, required=False)

    avg_rating = serializers.SerializerMethodField()
    num_likes = serializers.SerializerMethodField()
    num_views = serializers.SerializerMethodField()

    class Meta:
        model = Recipes
        fields = '__all__'

    def get_avg_rating(self, obj):
        return obj.reviews.all().aggregate(Avg('rate'))['rate__avg']

    def get_num_likes(self, obj):
        recipe = Recipes.objects.get(id=obj.id)
        return recipe.favorites.count()

    def get_num_views(self, obj):
        recipe = Recipes.objects.get(id=obj.id)
        recipe.views=recipe.views+1
        recipe.save()
        print("called add view to recipe!")
        return recipe.views

    
