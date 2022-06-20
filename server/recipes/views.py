from django.shortcuts import render

# Create your views here.
# from django.http import HttpResponse, JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.parsers import JSONParser
from recipes.models import Recipes
from recipes.serializers import RecipesSerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from .serializers import RecipesSerializer
from .models import Recipes

class RecipeViewSet(ModelViewSet):
    serializer_class = RecipesSerializer
    queryset = Recipes.objects.all()
    permission_classes = [IsAuthenticated]

    @action(detail=False)
    def get_list(self, request):
        pass
      
    @action(detail=True)
    def get_recipes(self, request, pk=None):
        pass

    @action(detail=True, methods=['post', 'delete'])
    def delete_recipes(self, request, pk=None):
        pass






# @csrf_exempt
# def recipes_list(request):
#     """
#     List all recipes, or create a new recipe.
#     """
#     if request.method == 'GET':
#         recipes = Recipes.objects.all()
#         serializer = RecipesSerializer(recipes, many=True)
#         return JsonResponse(serializer.data, safe=False)

#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         serializer = RecipesSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)

# @csrf_exempt
# def recipes_detail(request, pk):
#     """
#     Retrieve, update or delete.
#     """
#     try:
#         recipe = Recipes.objects.get(pk=pk)
#     except Recipes.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         serializer = RecipesSerializer(recipe)
#         return JsonResponse(serializer.data)

#     elif request.method == 'PUT':
#         data = JSONParser().parse(request)
#         serializer = RecipesSerializer(recipe, data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors, status=400)

#     elif request.method == 'DELETE':
#         recipe.delete()
#         return HttpResponse(status=204)