from django.shortcuts import render

# Create your views here.
from recipes.models import Recipes
from recipes.serializers import RecipesSerializer
from rest_framework.decorators import action
from rest_framework import filters, generics

from rest_framework.viewsets import ModelViewSet
from .serializers import RecipesSerializer
from .models import Recipes, Review

class RecipeViewSet(ModelViewSet):
    serializer_class = RecipesSerializer
    queryset = Recipes.objects.all()

    @action(detail=False)
    def get_list(self, request):
        pass
      
    @action(detail=True)
    def get_recipes(self, request, pk=None):
        pass

    @action(detail=True, methods=['post', 'delete'])
    def delete_recipes(self, request, pk=None):
        pass

class SearchResultsList(generics.ListCreateAPIView):
    filter_backends = (filters.SearchFilter,)
    search_fields = ['description', 'title']
    serializer_class = RecipesSerializer
    queryset = Recipes.objects.all()
