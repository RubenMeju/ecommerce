from django.urls import path, include
from .views import CategoryViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'category', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
