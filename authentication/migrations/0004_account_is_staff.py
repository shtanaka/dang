# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-12 00:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_auto_20161212_0035'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='is_staff',
            field=models.BooleanField(default=True),
        ),
    ]
