from django.db import models
from core.models import TimeFeed


class Job(TimeFeed):
    title = models.CharField(max_length=200, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.title


class Skill(TimeFeed):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='job_skill', null=True)
    skill_name = models.CharField(max_length=200)

    def __str__(self):
        return self.skill_name
