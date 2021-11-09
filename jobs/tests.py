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


class JobDetailTestCase(APITestCase):

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
        content = eval(response.content.decode('utf-8'))
        job_id = content['job_skill'][0]['job']
        get_response = self.client.get(reverse('job_detail_view', kwargs={'pk': job_id}))
        get_content = eval(get_response.content.decode('utf-8'))
        # Check status response
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)
        # Check database
        self.assertEqual(get_content, content)


class JobListTestCase(APITestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = APIClient()
        cls.create_job_url = reverse('create_job_view')
        cls.get_jobs_list_url = reverse('job_list_view')

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
        content = eval(response.content.decode('utf-8'))
        get_response = self.client.get(self.get_jobs_list_url)
        get_content = eval(get_response.content.decode('utf-8'))
        # Check status response
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)
        # Check database
        new_job = Job.objects.get(title=content.get('title'))
        self.assertEqual(get_content[0]['title'], new_job.title)


class SkillListTestCase(APITestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = APIClient()
        cls.create_job_url = reverse('create_job_view')
        cls.get_skills_list_url = reverse('skill_list_view')

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
        content = eval(response.content.decode('utf-8'))
        get_response = self.client.get(self.get_skills_list_url)
        get_content = eval(get_response.content.decode('utf-8'))
        # Check status response
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)
        # Check database
        new_skill_exists = Skill.objects.filter(skill_name__in=[x['skill_name'] for x in content['job_skill']]).exists()
        self.assertEqual(True, new_skill_exists)


