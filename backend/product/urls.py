from rest_framework.routers import DefaultRouter
from .views import AttributeViewSet, ProductViewSet

router = DefaultRouter()
router.register(r'attributes', AttributeViewSet)
router.register(r'products', ProductViewSet)

urlpatterns = router.urls
