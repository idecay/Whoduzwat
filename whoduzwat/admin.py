from django.contrib import admin

from .models import Family, FamilyMember, Chore

admin.site.register([Family, FamilyMember, Chore])