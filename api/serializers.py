from rest_framework import serializers
from .models import Post, Comment, Tag, Persona, LikeComments, LikePosts


class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = ['username', 'rut', 'email', 'password', 'image']
        extra_kwargs = {"password": {"write_only":True}}
    def create(self, validated_data):
        user = Persona.objects.create_user(**validated_data)
        return user
     

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'author', 'image', 'tags', 'created_at', 'likes','slug')
        extra_kwargs = {"author": {"read_only":True}}

class PostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'author', 'image', 'tags', 'created_at', 'likes','slug')
        extra_kwargs = {"author": {"read_only":True}}


class TagSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.postobjects.all())  # Agrega este campo

    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug', 'posts')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'image', 'post', 'created_at', 'likes')
        extra_kwargs = {"author": {"read_only":True}, "post": {"read_only":True}}

class CommentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'image', 'post', 'created_at', 'likes')
        extra_kwargs = {"author": {"read_only":True}, "post": {"read_only":True}}

class LikePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikePosts
        fields = ('id','author','post')

class LikeCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeComments
        fields = ('id','author','comment')

