# Generated by Django 4.0.5 on 2022-06-26 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0027_alter_recipes_price_alter_recipes_views'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipes',
            name='views',
            field=models.IntegerField(default=0),
        ),
    ]
