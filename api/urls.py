from django.urls import path, include
from .views import PersonaRegisterAPIView, PersonaLoginAPIView, PersonaViewAPI, PersonaLogoutViewAPI
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('user/register/', PersonaRegisterAPIView.as_view()),
	path('user/login/', PersonaLoginAPIView.as_view()),
	path('user/', PersonaViewAPI.as_view()),
	path('user/logout/', PersonaLogoutViewAPI.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
