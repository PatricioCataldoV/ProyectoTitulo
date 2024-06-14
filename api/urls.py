from django.urls import path
from . import views


urlpatterns = [
    path("posts", views.PostListView.as_view(), name="post-list"),
    path("post/<slug:slug>", views.PostDetailView.as_view(), name="post-detail"),
    path("search", views.SearchPostView.as_view(), name="search"),
    path("create_post", views.CreatePostView.as_view(), name="create-post"),
    path("draft", views.DraftPostView.as_view(), name="draft-post"),
    path("published", views.PublishPostView.as_view(), name="publish-post"),
    path("profile/author_list", views.AuthorListView.as_view(), name="author-list"),
    path("profile",views.PersonaProfileView.as_view(), name="profile"),
    path("posts/by_tag/<slug>", views.ListPostsByTagView.as_view(), name="post-list-by-tag"),
    path("post/<slug:slug>/delete", views.DeletePostView.as_view(), name="delete-post"),
    path("post/<slug:slug>/comments", views.ListCommentsByPostView.as_view(), name="comment-list"),
    path("create_comment", views.CreateCommentView.as_view(), name="create-comment"),
    path("post/<slug:post_slug>/comment/<slug:comment_slug>/delete", views.DeleteCommentView.as_view(), name="delete-comment"),
    path("tag_list", views.ListTagView.as_view(), name="tag-list"),
    path("post/<slug:post_slug>/comment/<slug:comment_slug>/like_comment", views.LikeCommentCreateView.as_view(), name="like-comment"),
    path("post/<slug>/like_post", views.LikePostCreateView.as_view(), name="like-post"),
]
