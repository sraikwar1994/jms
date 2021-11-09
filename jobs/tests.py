from django.test import TestCase

# Create your tests here.

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import Job, Skill
import json


class JobCreationTestCase(APITestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = APIClient()
        cls.create_job_url = reverse('create_job_view')

    def test_if_data_is_correct(self):
        # prepared data
        data = {
            "title":"Software Engineer Position",
            "job_skill":[
                {
                    "skill_name":"django"
                },
                {
                    "skill_name":"django-rest-framework"
                }
            ],
            "description":"Python developer having good knowledge in Framework and CMS"
        }
        # make request
        response = self.client.post(self.create_job_url, json.dumps(data), content_type='application/json')
        # Check status response
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Check database
        new_job = Job.objects.get(title=data['title'])
        self.assertEqual(
            new_job.description,
            data['description'],
        )

