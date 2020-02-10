from django.db import models


class Family(models.Model):
    family_name = models.CharField(max_length=100)

    def __str__(self):
        return self.family_name


class FamilyMember(models.Model):
    full_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, default='username', blank=True)
    password = models.CharField(max_length=100, default ='password', blank=True)
    is_parent = models.BooleanField(default=False)
    profile_image = models.TextField(default='', blank=True)
    family = models.ManyToManyField(Family, related_name="family_members")

    def __str__(self):
        return self.full_name


class Chore(models.Model):
    task = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default='', blank=True)
    value = models.DecimalField(max_digits=5, decimal_places=2)
    image_url = models.TextField(default='', blank=True)
    person_responsible = models.ForeignKey(
        FamilyMember,
        models.SET_NULL,
        blank=True,
        null=True,
        related_name="chores")
    family = models.ForeignKey(Family, models.SET_NULL, blank=True, null=True, related_name="chores")

    def __str__(self):
        return self.task
