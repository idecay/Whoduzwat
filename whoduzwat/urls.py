from django.conf.urls import include
from django.urls import path
from rest_framework import routers

from .import views
router = routers.DefaultRouter()
router.register('family', views.FamilyView)
router.register('familymember', views.FamilyMemberView)
router.register('chore', views.ChoreView)

urlpatterns = [
    path('', include(router.urls))
]