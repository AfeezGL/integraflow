# Generated by Django 3.2.23 on 2024-05-07 02:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0004_auto_20231212_2159'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventdefinition',
            name='volume_30_day',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
