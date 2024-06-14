from django.contrib import admin
from .models import Persona, Tag, Post, Comment, LikeComments, LikePosts

# Register your models here.

class PersonaAdmin(admin.ModelAdmin):
    list_display = ['rut','username']


admin.site.register(Persona, PersonaAdmin)
admin.site.register(Tag)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(LikePosts)
admin.site.register(LikeComments)
