from django.db import models


# Create your models here.

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True, blank=True)
    vin = models.CharField(max_length=17, unique=True, null=True, blank=True)
    sold = models.BooleanField(default=False)

class TechnicianModel(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

class AppointmentModel(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField(("reason"), max_length=100)
    status = models.CharField(max_length=100)
    vin = models.CharField(max_length=17, unique=True, null=True, blank=True)
    customer = models.CharField(max_length=100)

    technician = models.ForeignKey(
        TechnicianModel,
        related_name='technician',
        on_delete=models.CASCADE
        )
