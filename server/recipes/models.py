from django.db import models
from core.settings import AUTH_USER_MODEL
from django.core.validators import MaxValueValidator, MinValueValidator



# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Recipes(models.Model):
    author = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    header_image = models.ImageField(null=True, blank=True, upload_to="images/")
    title =  models.CharField(max_length=255, blank=True, default='')
    description = models.TextField(null=True, blank=True, default='')
    private = models.BooleanField(default=False)
    total_cook_time = models.IntegerField(default = 0, null=True, blank=True)
    rating = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],  null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    price = models.DecimalField(max_digits=9, decimal_places=2, default='0')
    source = models.URLField(max_length=200, null=True, blank = True, default='')
    category = models.ManyToManyField(Category, related_name='recipes')
    
    # ingredient list
    # course
    # cuisine
    # keywords
    # serving
    # calories

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title

class Comment(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE, related_name='comments', related_query_name='comment')
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments', related_query_name='comment')
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return self.title
        

