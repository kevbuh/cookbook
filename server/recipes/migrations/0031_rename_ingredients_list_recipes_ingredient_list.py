# Generated by Django 4.0.5 on 2022-06-26 21:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0030_recipes_ingredients_list'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recipes',
            old_name='ingredients_list',
            new_name='ingredient_list',
        ),
    ]
