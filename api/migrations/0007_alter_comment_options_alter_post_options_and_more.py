# Generated by Django 5.0.4 on 2024-06-13 00:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_comment_author_alter_post_author'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ('-created_at',)},
        ),
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ('-created_at',)},
        ),
        migrations.AddField(
            model_name='comment',
            name='likes',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='post',
            name='likes',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='post',
            name='slug',
            field=models.SlugField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='tag',
            name='slug',
            field=models.SlugField(default='', max_length=40),
        ),
        migrations.CreateModel(
            name='CommentLikeCount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip_address', models.CharField(max_length=255)),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_like_count', to='api.comment')),
            ],
        ),
        migrations.CreateModel(
            name='PostLikeCount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip_address', models.CharField(max_length=255)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_like_count', to='api.post')),
            ],
        ),
        migrations.DeleteModel(
            name='Like',
        ),
    ]