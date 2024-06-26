# Generated by Django 5.0.4 on 2024-06-14 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_likecomments_options_alter_likeposts_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='persona',
            name='image',
            field=models.ImageField(default='profile_default.jpg', upload_to='imgsProfile', verbose_name='Imagen'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='image',
            field=models.ImageField(blank=True, upload_to='imgsC', verbose_name='Imagen'),
        ),
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, upload_to='imgsP', verbose_name='Imagen'),
        ),
    ]
