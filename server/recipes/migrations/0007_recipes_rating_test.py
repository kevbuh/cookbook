# Generated by Django 4.0.5 on 2022-06-22 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0006_alter_recipes_rating_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipes',
            name='rating_test',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]
