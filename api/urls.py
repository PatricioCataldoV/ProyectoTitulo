from django.urls import path
from . import views


urlpatterns = [
    path("posts", views.PostListView.as_view(), name="post-list"),
    path("post/<int:id>", views.PostDetailView.as_view(), name="post-detail"),
    path("search", views.SearchPostView.as_view(), name="search"),
    path("create_post", views.CreatePostView.as_view(), name="create-post"),
    path("profile/author_list", views.AuthorListView.as_view(), name="author-list"),
    path("profile",views.ProfileView.as_view(), name="profile"),
    path("posts/by_tag/<int:id>", views.ListPostsByTagView.as_view(), name="post-list-by-tag"),
    path("post/<int:id>/delete", views.DeletePostView.as_view(), name="delete-post"),
    path("post/<int:id>/comments", views.ListCommentsByPostView.as_view(), name="comment-list"),
    path("create_comment", views.CreateCommentView.as_view(), name="create-comment"),
    path("comment/<int:id_comment>/delete", views.DeleteCommentView.as_view(), name="delete-comment"),
    path("tag_list", views.ListTagView.as_view(), name="tag-list"),
    path("comment/<int:id_comment>/like_comment", views.LikeCommentCreateView.as_view(), name="like-comment"),
    path("post/<int:id>/like_post", views.LikePostCreateView.as_view(), name="like-post"),
]
