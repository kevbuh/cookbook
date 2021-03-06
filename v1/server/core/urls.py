"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from recipes.views import RecipeViewSet, SearchResultsList, RatingViewSet, LikeRecipeViewSet, CommentViewSet, IngredientViewSet, RecipesCreatedByUser, GroceryListViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

router = DefaultRouter()
router.register(r'recipe', RecipeViewSet, basename='Recipe')
router.register(r'rating', RatingViewSet, basename='Review')
router.register(r'like', LikeRecipeViewSet, basename='LikeRecipe')
router.register(r'grocerylist', GroceryListViewSet, basename='GroceryList')
router.register(r'comment', CommentViewSet, basename='Comment')
router.register(r'ingredient', IngredientViewSet, basename='Ingredient')



urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('auth/', include('users.urls')),
    path("search/", SearchResultsList.as_view(), name="search_results"),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view()),
    path("my_recipes/", RecipesCreatedByUser.as_view(), name="RecipesCreatedByUser"),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)