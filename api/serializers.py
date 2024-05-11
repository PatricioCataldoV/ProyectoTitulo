from django.forms import ValidationError
from rest_framework import serializers
from .models import Post, Comment, Tag, Like
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class PersonaRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})
    class Meta:
        model = UserModel
        fields = ['name', 'rut', 'email', 'password']
    def create(self, validated_data):
        user_password = validated_data.get('password', None)
        db_instance = self.Meta.model(rut=validated_data.get('rut'), name=validated_data.get('name'), email=validated_data.get('email'))
        db_instance.set_password(user_password)
        db_instance.save()
        return db_instance

class PersonaLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=12, read_only=True)
    password = serializers.CharField(max_length=100, min_length=8, style={'input_type':'password'})
    token = serializers.CharField(max_length=255, read_only=True)
        

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('name', 'email', 'rut')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        ## fields = {'id', 'title', 'content', 'author', 'tags', 'created_at'}
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        ## fields = {'id','name'}
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        ## field = {'id', 'content', 'author', 'post', 'created_at'}
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        ## fields = {'id', 'comment', 'post'}
        fields = '__all__'