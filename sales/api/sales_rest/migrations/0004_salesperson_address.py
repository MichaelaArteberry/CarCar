# Generated by Django 4.0.3 on 2024-03-19 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0003_alter_automobilevo_import_href_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='salesperson',
            name='address',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
