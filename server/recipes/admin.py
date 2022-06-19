from django.contrib import admin
from .models import Recipes, Comment, Category
from django.contrib.auth.models import Group

# Register your models here.

admin.site.register(Recipes)
admin.site.register(Comment)
admin.site.register(Category)


admin.site.unregister(Group)
