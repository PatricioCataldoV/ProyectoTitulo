from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from django.conf import settings
from django.contrib.auth import get_user_model
from .utils import generate_access_token
from .serializers import PersonaRegisterSerializer, PersonaLoginSerializer, PostSerializer, CommentSerializer, LikeSerializer, TagSerializer
from .models import Persona, Post, Comment, Like, Tag
import jwt
# Create your views here.


class PersonaRegisterAPIView(APIView):
	serializer_class = PersonaRegisterSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (AllowAny,)
    
	def get(self, request):
		content = { 'message': 'Hello!' }
		return Response(content)

	def post(self, request):
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid(raise_exception=True):
			new_user = serializer.save()
			if new_user:
				access_token = generate_access_token(new_user)
				data = { 'access_token': access_token }
				response = Response(data, status=status.HTTP_201_CREATED)
				response.set_cookie(key='access_token', value=access_token, httponly=True)
				return response
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
class PersonaLoginAPIView(APIView):
	serializer_class = PersonaLoginSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (AllowAny,)
	
	def post(self, request):
		rut = request.data.get('rut', None)
		user_password = request.data.get('password', None)

		if not user_password:
			raise AuthenticationFailed('La contraseña es obligatoria.')

		if not rut:
			raise AuthenticationFailed('El rut es Obligatorio.')

		user_instance = authenticate(username=rut, password=user_password)

		if not user_instance:
			raise AuthenticationFailed('Usuario no encontrado.')

		if user_instance.is_active:
			user_access_token = generate_access_token(user_instance)
			response = Response()
			response.set_cookie(key='access_token', value=user_access_token, httponly=True)
			response.data = {
				'access_token': user_access_token
			}
			return response

		return Response({
			'message': 'Algo salio mal.'
		})
	
class PersonaAPIView(APIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (AllowAny,)

	def get(self, request):
		user_token = request.COOKIES.get('access_token')

		if not user_token:
			raise AuthenticationFailed('Usuario no autentificado.')

		payload = jwt.decode(user_token, settings.SECRET_KEY, algorithms=['HS256'])

		user_model = get_user_model()
		user = user_model.objects.filter(id=payload['id']).first()
		user_serializer = PersonaRegisterSerializer(user)
		return Response(user_serializer.data)

class PersonaLogoutAPIView(APIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (AllowAny,)

	def get(self, request):
		user_token = request.COOKIES.get('access_token', None)
		if user_token:
			response = Response()
			response.delete_cookie('access_token')
			response.data = {
				'message': 'Salida de sesión exitosa.'
			}
			return response
		response = Response()
		response.data = {
			'message': 'El usuario ya ha cerrado sesión.'
		}
		return response    


class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all() 

class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all() 

class LikeView(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    queryset = Like.objects.all() 

class TagView(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all() 