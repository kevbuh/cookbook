
# Create your views here.
from rest_framework.decorators import action
from rest_framework import filters, generics, pagination
from rest_framework.viewsets import ModelViewSet

from .serializers import RecipesSerializer, ReviewSerializer, LikedPostSerializer, CommentSerializer, IngredientSerializer, GroceryListSerializer
from .models import Recipes, Review, Favorites, Comment, Ingredients, GroceryLists


class RecipeViewSet(ModelViewSet):
    serializer_class = RecipesSerializer
    queryset = Recipes.objects.all()
    pagination_class = pagination.CursorPagination


    @action(detail=False)
    def get_list(self, request):
        pass
      
    @action(detail=True)
    def get_recipes(self, request, pk=None):
        pass

    @action(detail=True, methods=['post', 'delete'])
    def delete_recipes(self, request, pk=None):
        pass



class RecipesCreatedByUser(generics.ListCreateAPIView):
    # filter_backends = (filters.SearchFilter,)
    # search_fields = ['text', 'title']
    serializer_class = RecipesSerializer
    # filterset_fields = ['creator']
    # queryset = Note.objects.all()

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Recipes.objects.filter()
        user = self.request.user
        return Recipes.objects.filter(author=user)

class GroceryListViewSet(ModelViewSet):
    queryset = GroceryLists.objects.all()
    serializer_class = GroceryListSerializer

    def get_object(self):
        queryset = GroceryLists.objects.filter()
        user = self.request.user
        return GroceryLists.objects.filter(author=user)

class SearchResultsList(generics.ListCreateAPIView):
    filter_backends = (filters.SearchFilter,)
    search_fields = ['description', 'title']
    serializer_class = RecipesSerializer
    queryset = Recipes.objects.all()

class RatingViewSet(ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class LikeRecipeViewSet(ModelViewSet):
    queryset = Favorites.objects.all()
    serializer_class = LikedPostSerializer

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class IngredientViewSet(ModelViewSet):
    queryset = Ingredients.objects.all()
    serializer_class = IngredientSerializer
