from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .pagination import SmallSetPagination
from .permissions import IsPostAuthorOrReadOnly
from django.db.models.query_utils import Q
from .serializers import PersonaSerializer, PostSerializer, PostListSerializer,CommentListSerializer
from .models import Persona, Post, Comment, Tag, LikeComments, LikePosts

# Create your views here.

class CreatePostView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        user = self.request.user
        Post.postobjects.create(author=user)

        return Response({'success': 'Post created'})

class PostListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        if Post.postobjects.all().exists():

            posts = Post.postobjects.all()

            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(posts, request)
            serializer = PostListSerializer(results, many=True)

            return paginator.get_paginated_response({'posts': serializer.data})
        else:
            return Response({'error':'No posts found'}, status=status.HTTP_404_NOT_FOUND)
        
class ListTagView(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, format=None):
        if Tag.objects.all().exists():
            tags = Tag.objects.all()

            result = []
            for tag in tags:
                item = {}

                item['id']=tag.id
                item['name']=tag.name
                item['slug']=tag.slug

                result.append(item)

            return Response({'tags': result}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No tags found'}, status=status.HTTP_404_NOT_FOUND)

class ListPostsByTagView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, slug, format=None):
        tag = Tag.objects.get(slug=slug)
        if tag:
            posts = Post.postobjects.filter(tags=tag).all()
            if posts:
                posts = posts.order_by('-created_at').all()   
                paginator = SmallSetPagination()
                results = paginator.paginate_queryset(posts, request)
                serializer = PostListSerializer(results, many=True)

                return paginator.get_paginated_response({'posts': serializer.data})
            else:
                return Response({'error':'No posts found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error':'No tags found'}, status=status.HTTP_404_NOT_FOUND)
        
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_profile = get_object_or_404(Persona, email=request.user.email)
        serializer = PersonaSerializer(user_profile)
        return Response(serializer.data)

        
class PostDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, slug, format=None):
        if Post.postobjects.filter(slug=slug).exists():
            
            post = Post.postobjects.get(slug=slug)
            serializer = PostSerializer(post)

            return Response({'post':serializer.data})
        else:
            return Response({'error':'Post doesnt exist'}, status=status.HTTP_404_NOT_FOUND)

class DeletePostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly,)
    def delete(self, request, slug, format=None):
        
        post = Post.objects.get(slug=slug)

        post.delete()

        return Response({'success': 'Post deleted'})
    
class SearchPostView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request, format=None):
        search_term = request.query_params.get('s')
        matches = Post.postobjects.filter(
            Q(title__icontains=search_term) |
            Q(content__icontains=search_term)
        )

        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(matches, request)

        serializer = PostListSerializer(results, many=True)
        return paginator.get_paginated_response({'filtered_posts': serializer.data})
    
class AuthorListView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):

        user = self.request.user

        if Post.objects.filter(author=user).exists():

            posts = Post.objects.filter(author=user)

            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(posts, request)
            serializer = PostListSerializer(results, many=True)

            return paginator.get_paginated_response({'posts': serializer.data})
        else:
            return Response({'error':'No posts found'}, status=status.HTTP_404_NOT_FOUND)
        

class DraftPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly,)
    def put(self, request, format=None):
        data = self.request.data
        slug = data['slug']

        post = Post.objects.get(slug=slug)

        post.status = 'draft'
        post.save()

        return Response({'success': 'Post edited'})


class PublishPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly,)
    def put(self, request, format=None):
        data = self.request.data
        slug = data['slug']

        post = Post.objects.get(slug=slug)

        post.status = 'published'
        post.save()

        return Response({'success': 'Post edited'})

class ListCommentsByPostView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, slug, format=None):
        if Comment.objects.all().exists():
            post = Post.postobjects.get(slug=slug)
            comments = Comment.objects.order_by('-created_at').all()
            comments = comments.filter(post=post)      
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(comments, request)
            serializer = CommentListSerializer(results, many=True)

            return paginator.get_paginated_response({'comments': serializer.data})
        else:
            return Response({'error':'No comments found'}, status=status.HTTP_404_NOT_FOUND)

class CreateCommentView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        user = self.request.user
        Comment.objects.create(author=user)

        return Response({'success': 'Comment published'})
    
class DeleteCommentView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly,)
    def delete(self, request, slug, format=None):
        
        comment = Comment.objects.get(slug=slug)

        comment.delete()

        return Response({'success': 'Comment deleted'})

class CreatePersonaView(generics.CreateAPIView):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer
    permission_classes = [AllowAny]

        
class LikePostCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, slug, format=None):
        if Post.objects.filter(slug=slug).exists():
            user = self.request.user
            post = Post.objects.get(slug=slug)
            like, created = LikePosts.objects.get_or_create(author=user, post=post)
            if created:
                post.likes += 1
                post.save()
                return Response({'success': 'Like created'})
            else:
                like.delete()
                post.likes -= 1
                post.save()
                return Response({'success': 'Like removed'})
        else:
            return Response({'error':'Post doesnt exist'}, status=status.HTTP_404_NOT_FOUND)
        
class LikeCommentCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, slug, format=None):
        if Post.objects.filter(slug=slug).exists():
            comment = Comment.objects.get(slug=slug)
            user = self.request.user
            like, created = LikeComments.objects.get_or_create(author=user, comment=comment)
            if created:
                comment.likes += 1
                comment.save()
                return Response({'success': 'Like created'})
            else:
                like.delete()  # Elimina el "me gusta" existente
                comment.likes -= 1
                comment.save()
                return Response({'success': 'Like removed'})
        else:
            return Response({'error': 'Comment does not exist'}, status=status.HTTP_404_NOT_FOUND)