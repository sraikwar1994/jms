from rest_framework import serializers
from .models import Job, Skill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["skill_name", "job"]
        read_only_field = ["job"]


class JobSerializer(serializers.ModelSerializer):
    job_skill = SkillSerializer(many=True)

    class Meta:
        model = Job
        fields = ['title', 'job_skill', 'description', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        job_skills = validated_data.pop('job_skill')
        job = Job.objects.create(**validated_data)

        for skill in job_skills:
            skill, created = Skill.objects.get_or_create(skill_name=skill['skill_name'], job_id=job.id)

        return job


class JobListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ["id", "title"]


class SkillsListSerializer(serializers.ModelSerializer):
    most_used = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = ["skill_name", "most_used"]

    def get_most_used(self, data):
        return data['id__count']

