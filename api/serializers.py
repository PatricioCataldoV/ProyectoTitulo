from django.forms import ValidationError
from rest_framework import serializers
from .models import Post, Comment, Tag, Like
from django.contrib.auth import get_user_model, password_validation, authenticate

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


    rut = serializers.CharField(max_length=12, read_only=True)
    password = serializers.CharField(max_length=100, min_length=8, style={'input_type':'password'})

    def validate(self, data):
        user = authenticate(username=data['rut'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Las credenciales no son correctas.')
        self.context['user'] = user
        return data
        
    def create(self, data):

        token, created = token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key      

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