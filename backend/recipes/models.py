from django.db import models

# Create your models here.
class Recipes(models.Model):
    title =  models.CharField(max_length=100, blank=True, default='')
    description = models.CharField(max_length=256, blank=True, default='')
    created = models.DateTimeField(auto_now_add=True)
    
    # visibility -> public/private
    public = models.BooleanField(default=False)

    # author
    # category
    # media
    # source
    # rating
    # ingredient list
    # comments
    # prep + cook time

    class Meta:
        ordering = ['created']