from django.db import models
from django.urls import reverse
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import MaxValueValidator

# Create your models here.
class PersonaManager(BaseUserManager):
    def create_user(self, email, username, rut, password=None):
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, rut=rut)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, username, rut, password=None):
        user = self.create_user(email, username, rut, password)
        user.is_superuser= True
        user.is_admin = True
        user.is_staff = True
        user.save()
        return user
        

class Persona(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=60)
    rut = models.CharField(max_length=12, unique=True)
    email = models.EmailField(max_length=254, unique=True)
    date_joined = models.DateField(auto_now_add=True)
    exp = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(100)])
    level = models.PositiveIntegerField(default = 1)
    image= models.ImageField(verbose_name="Imagen", upload_to="imgsProfile", default="profile_default.jpg")
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = PersonaManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'rut']

    def __str__(self):
        return self.email
    


class Tag(models.Model):
    name = models.CharField(max_length = 40)
    slug = models.SlugField(max_length=40)

    def __str__(self):
        return self.name # En caso de llamar al modelo para presentarlo, muestra el nombre por defecto

class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length = 255)
    content = models.CharField(max_length = 1000)
    author = models.ForeignKey(Persona, on_delete = models.CASCADE, related_name= "Posts")
    slug = models.SlugField(max_length=100, unique=True)
    tags = models.ManyToManyField(Tag, blank=True)
    status = models.CharField(max_length=10, choices=options, default="draft")
    created_at = models.DateTimeField(auto_now_add = True)
    image= models.ImageField(verbose_name="Imagen", upload_to="imgsP", blank=True)
    likes = models.IntegerField(default=0)

    postobjects = PostObjects()

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title # En caso de llamar al modelo para presentarlo, muestra el titulo por defecto
    
    
    def get_status(self):
        status = self.status
        return status

class Comment(models.Model):
    content = models.CharField(max_length = 255)
    author = models.ForeignKey(Persona, on_delete = models.CASCADE, related_name= "comentarios")
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)
    slug = models.SlugField(max_length=100, unique=True)
    likes = models.IntegerField(default=0, blank=True)
    image= models.ImageField(verbose_name="Imagen", upload_to="imgsC", blank=True)

    
    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.content
    
    
class LikeComments(models.Model):
    author = models.ForeignKey(Persona, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = "LikeComments"

class LikePosts(models.Model):
    author = models.ForeignKey(Persona, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = "LikePosts"





