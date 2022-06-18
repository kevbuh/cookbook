from django.db import models
from core.settings import AUTH_USER_MODEL
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Recipes(models.Model):
    author = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    title =  models.CharField(max_length=50, blank=True, default='')
    description = models.CharField(max_length=256, blank=True, default='')
    source = models.URLField(max_length=200, blank = True, default='')
    private = models.BooleanField(default=False)
    total_cook_time = models.IntegerField(default = 0, blank=True)
    modified_date = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(auto_now_add=True)
    rating = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])
    
    # category
    # media
    # ingredient list
    # comments

    class Meta:
        ordering = ['modified_date']
        