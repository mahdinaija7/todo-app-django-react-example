from django.db import models
from django.contrib.auth import get_user_model


class Todos(models.Model):
    user = models.ForeignKey(
        get_user_model(), to_field="username",
        on_delete=models.CASCADE,
        related_name='todos',
    )
    title = models.CharField(max_length=256)
    description = models.TextField(max_length=1000, blank=True)
    completed = models.BooleanField(default=False)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return "%s => %s" % (self.title, "Completed " if self.completed else "Not Completed")

    class Meta:
        verbose_name = "Todos"
        verbose_name_plural = "todos"
