# Generated by Django 4.0.5 on 2022-06-30 04:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0039_grocerylist_created_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='created',
            new_name='created_at',
        ),
    ]
