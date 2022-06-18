from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from recipes.models import Recipes
from recipes.serializers import RecipesSerializer

@csrf_exempt
def recipes_list(request):
    """
    List all recipes, or create a new recipe.
    """
    if request.method == 'GET':
        recipes = Recipes.objects.all()
        serializer = RecipesSerializer(recipes, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = RecipesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def recipes_detail(request, pk):
    """
    Retrieve, update or delete.
    """
    try:
        recipe = Recipes.objects.get(pk=pk)
    except Recipes.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = RecipesSerializer(recipe)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = RecipesSerializer(recipe, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        recipe.delete()
        return HttpResponse(status=204)