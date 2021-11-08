from django.urls import path
from .views import *


urlpatterns = [
    path('create', CreateJobView.as_view(), name="create_job_view"),
    path('get_job_details/<int:pk>', JobDetailView.as_view(), name="job_detail_view"),
    path('get_jobs_list', JobListView.as_view(), name="job_list_view"),
    path('get_skills_list', SkillsListView.as_view(), name="skill_list_view"),
]