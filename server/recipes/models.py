from django.db import models
from core.settings import AUTH_USER_MODEL
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name


class Recipes(models.Model):
    CHEAP = '$'
    MEDIUM = '$$'
    EXPENSIVE = '$$$'
    PRICE_CHOICES = [
        (CHEAP, '33'),
        (MEDIUM, '66'),
        (EXPENSIVE, '99'),
    ]
    price = models.CharField(
        max_length=3,
        choices=PRICE_CHOICES,
        default=CHEAP,
    )
    author = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    # need author name as well
    title =  models.CharField(max_length=255, blank=True, default='')
    description = models.TextField(null=True, blank=True, default='')
    caption = models.TextField(null=True, blank=True, default='')
    ingredient_list = models.TextField(null=True, blank=True, default='')
    private = models.BooleanField(default=False)
    total_cook_time = models.IntegerField(default = 0, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    source = models.URLField(max_length=200, null=True, blank = True, default='')
    category = models.ManyToManyField(Category, related_name='recipes', blank=True, null=True)
    image = models.ImageField(null=True, blank=True, upload_to="images/")
    
    # number of clicks/views
    views = models.IntegerField(default=0)
    # course
    # cuisine
    # potential allergies
    # keywords
    # servings
    # calories
    # number of ingredients

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title

# class UploadedImage(models.Model):
#     image = models.ImageField(null=True, blank=True, upload_to="images/")
#     recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE, related_name='uploaded_images', related_query_name='uploaded_image', blank=True, null=True)
#     # user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='uploaded_images', related_query_name='uploaded_image')
#     created = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return str(self.id)

class Comment(models.Model):
    content = models.TextField(max_length=255)
    recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE, related_name='comments', related_query_name='comment', blank=True, null=True)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments', related_query_name='comment')
    created_at = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return str(self.id)

class Review(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews', related_query_name='review')
    recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE, related_name='reviews', related_query_name='review', blank=True, null=True)
    rate = models.IntegerField(default=5, validators=[MaxValueValidator(5),MinValueValidator(1)])
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ["user", "recipe"]

    def __str__(self):
        return str(self.id)

class Favorites(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='favorites', related_query_name='favorite')
    liked_recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE, related_name='favorites', related_query_name='favorite', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["user", "liked_recipe"]

    def __str__(self):
        return str(self.id)

class Ingredients(models.Model):
    name = models.CharField(max_length=255)
    amount = models.CharField(max_length=255)
    recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE, related_name='ingredients', related_query_name='ingredient', blank=True, null=True)

class GroceryLists(models.Model):
    author = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='grocerylists', related_query_name='grocerylist')
    content = models.TextField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.content