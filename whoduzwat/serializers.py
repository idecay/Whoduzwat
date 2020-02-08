from rest_framework import serializers
from .models import FamilyMember, Family, Chore


class ChoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chore
        fields = ('id', 'task', 'status', 'value', 'image_url')


class FamilyMemberSerializer(serializers.ModelSerializer):
    chores = ChoreSerializer(many=True, read_only=True)

    class Meta:
        model = FamilyMember
        fields = ('id', 'full_name', 'username', 'password', 'is_parent', 'profile_image', 'chores')


class FamilySerializer(serializers.ModelSerializer):
    chores = ChoreSerializer(many=True, read_only=True)
    family_members = FamilyMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Family
        fields = ('id', 'family_name', 'chores', 'family_members')
