from rest_framework import viewsets

from .models import FamilyMember, Family, Chore
from .serializers import FamilyMemberSerializer, FamilySerializer, ChoreSerializer


class FamilyView(viewsets.ModelViewSet):
    queryset = Family.objects.all()
    serializer_class = FamilySerializer


class FamilyMemberView(viewsets.ModelViewSet):
    queryset = FamilyMember.objects.all()
    serializer_class = FamilyMemberSerializer


class ChoreView(viewsets.ModelViewSet):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerializer
