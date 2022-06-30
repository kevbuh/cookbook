# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext as _
from .managers import CustomUserManager
from recipes.models import Recipes

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    is_premium = models.BooleanField(default=False)
    # favorite cuisines
    # food allergies
    # types of diets
    # ingredients you don't want to see
    # cooking level 
    # cooking goals

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email