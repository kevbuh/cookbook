# Generated by Django 4.0.5 on 2022-06-19 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0003_alter_recipes_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.RemoveField(
            model_name='recipes',
            name='category',
        ),
        migrations.AddField(
            model_name='recipes',
            name='category',
            field=models.ManyToManyField(related_name='recipes', to='recipes.category'),
        ),
    ]