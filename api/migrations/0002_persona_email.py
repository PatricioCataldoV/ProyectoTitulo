# Generated by Django 5.0.4 on 2024-04-22 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='persona',
            name='email',
            field=models.EmailField(default='ejemplo@mail.com', max_length=254, unique=True),
            preserve_default=False,
        ),
    ]
