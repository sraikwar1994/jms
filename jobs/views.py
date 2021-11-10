from django.views import View
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from .serializers import JobSerializer, JobListSerializer, SkillsListSerializer
from .models import Job, Skill
from django.db.models import Count
from django.http import HttpResponse, HttpResponseNotFound


class CreateJobView(CreateAPIView):
    serializer_class = JobSerializer
    queryset = Job.objects.filter()


class JobDetailView(RetrieveAPIView):
    serializer_class = JobSerializer
    queryset = Job.objects.filter()


class JobListView(ListAPIView):
    serializer_class = JobListSerializer
    queryset = Job.objects.filter()


class SkillsListView(ListAPIView):
    serializer_class = SkillsListSerializer
    queryset = Skill.objects.values('skill_name').annotate(Count('id')).order_by('-id__count')

