# Generated by Django 4.0.5 on 2022-06-22 17:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0012_review_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='title',
        ),
    ]
