# Generated by Django 3.2.23 on 2024-05-11 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0008_organization_usage_metadata'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='usage_metadata',
            field=models.JSONField(blank=True, default=dict, null=True),
        ),
    ]