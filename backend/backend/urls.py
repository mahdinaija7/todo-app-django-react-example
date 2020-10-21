from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import api
from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()
router.register(r"todos", api.TodoApiView, basename='TodoApiView')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('token-auth/', obtain_jwt_token),
    path('todo/', include('todo.urls'))
]
