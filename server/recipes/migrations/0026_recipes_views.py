# Generated by Django 4.0.5 on 2022-06-26 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0025_alter_recipes_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipes',
            name='views',
            field=models.IntegerField(default=0),
        ),
    ]
