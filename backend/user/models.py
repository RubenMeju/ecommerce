from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid


class User(AbstractUser):

    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True)
    email = models.EmailField(unique=True)

    username = models.CharField(max_length=100, unique=False)
    picture = models.ImageField(
        default="default_user.jpg",
        upload_to="media/users/pictures/",
        blank=True,
        null=True,
        verbose_name="Picture",
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


def __str__(self):
    return self.email
