from django.contrib import admin
from .models import Recipes, Comment, Category, Review, Favorites, Ingredients
from django.contrib.auth.models import Group

# Register your models here.
admin.site.register(Recipes)
admin.site.register(Comment)
admin.site.register(Category)
admin.site.register(Review)
admin.site.register(Favorites)
admin.site.register(Ingredients)


admin.site.unregister(Group)
