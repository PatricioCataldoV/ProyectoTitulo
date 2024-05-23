from django.urls import path, include
from .views import PersonaRegisterAPIView, PersonaLoginAPIView, PersonaAPIView, PersonaLogoutAPIView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('user/register/', PersonaRegisterAPIView.as_view()),
	path('user/login/', PersonaLoginAPIView.as_view()),
	path('user/', PersonaAPIView.as_view()),
	path('user/logout/', PersonaLogoutAPIView.as_view()),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ="token_obtain_pair"),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
]
