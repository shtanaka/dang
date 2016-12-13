from django.conf.urls import url
from rest_framework_nested import routers
from authentication.views import AccountViewSet, LoginView, LogoutView

auth_router = routers.SimpleRouter()
auth_router.register(r'accounts', AccountViewSet)

urlpatterns = [
    url(r'^login/$', LoginView.as_view(), name='login'),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
]