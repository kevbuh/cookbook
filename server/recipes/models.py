from django.db import models
from core.settings import AUTH_USER_MODEL
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Recipes(models.Model):
    author = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    header_image = models.ImageField(null=True, blank=True, upload_to="images/")
    title =  models.CharField(max_length=255, blank=True, default='')
    description = models.TextField(null=True, blank=True, default='')
    source = models.URLField(max_length=200, null=True, blank = True, default='')
    private = models.BooleanField(default=False)
    total_cook_time = models.IntegerField(default = 0, null=True, blank=True)
    modified_date = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(auto_now_add=True)
    rating = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],  null=True, blank=True)
    category = models.CharField(max_length=255, default='', null=True, blank=True)
    # ingredient list
    # comments

    class Meta:
        ordering = ['modified_date']
        