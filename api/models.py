from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser , PermissionsMixin

# Create your models here.
class PersonaManager(BaseUserManager):
    def create_user(self, name, rut, email, password=None):
        if not rut:
            raise ValueError("El RUT es obligatorio.")
        if not password:
            raise ValueError("La contraseña es obligatoria.")
        email = self.normalize_email(email)
        persona = self.model(name=name, rut=rut, email=email)
        persona.set_password(password)
        persona.save()
        return persona
    def create_superuser(self, name, rut, email, password=None):
        if not rut:
            raise ValueError("El RUT es obligatorio.")
        if not password:
            raise ValueError("La contraseña es obligatoria.")
        user = self.create_user(name, rut, email, password)
        user.is_superuser= True
        user.is_staff=True
        user.save()
        return user
    
class Award(models.Model):
    name = models.CharField(max_length = 255)
    description = models.CharField(max_length = 500)

    def __str__(self):
        return self.name
        

class Persona(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=60)
    rut = models.CharField(max_length=12, unique=True)
    email = models.EmailField(max_length=254, unique=True)
    date_joined = models.DateField(auto_now_add=True)
    exp = models.PositiveIntegerField(default = 0)
    level = models.PositiveIntegerField(default = 1)
    awards = models.ManyToManyField(Award)

    is_active = models.BooleanField(default=True)
    is_staff = False

    objects = PersonaManager()

    USERNAME_FIELD = 'rut'
    REQUIRED_FIELDS = ['name','email']

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length = 40)

    def __str__(self):
        return self.name # En caso de llamar al modelo para presentarlo, muestra el nombre por defecto

class Post(models.Model):
    title = models.CharField(max_length = 100)
    content = models.CharField(max_length = 600)
    author = models.ForeignKey(Persona, on_delete = models.CASCADE)
    tags = models.ManyToManyField(Tag)
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.title # En caso de llamar al modelo para presentarlo, muestra el titulo por defecto
    
class Comment(models.Model):
    content = models.CharField(max_length = 255)
    author = models.ForeignKey(Persona, on_delete = models.CASCADE)
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return self.content

class Like(models.Model):
    comment = models.ForeignKey(Comment, on_delete = models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)




