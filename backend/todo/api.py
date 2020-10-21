from .serializers import TodoSerializer
from .models import Todos
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer


class TodoApiView(viewsets.ModelViewSet):
    renderer_classes = [JSONRenderer]
    serializer_class = TodoSerializer

    def get_queryset(self):
        user = self.request.user
        return Todos.objects.filter(user=user)
