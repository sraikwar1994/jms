# Generated by Django 3.2.9 on 2021-11-08 10:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_auto_20211108_1030'),
    ]

    operations = [
        migrations.RenameField(
            model_name='skill',
            old_name='skill',
            new_name='skill_name',
        ),
    ]
