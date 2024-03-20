from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True, blank=True)
    vin = models.CharField(max_length=17, unique=True, null=True, blank=True)
    sold = models.BooleanField(default=False)

class TechnicianModel(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_api_url(self):
        return reverse("api_list_technicians", kwargs={"pk": self.id})

class AppointmentModel(models.Model):
    class Status(models.TextChoices):
        SCHEDULED = "scheduled", "Scheduled"
        CANCELED = "canceled", "Canceled"
        FINISHED = "finished", "Finished"

    customer_name = models.CharField(max_length=200, default="Default Customer")
    vip = models.BooleanField(default=False)
    vin = models.CharField(max_length=300, default="Default VIN")
    date_time = models.DateTimeField(null=True)
    technician = models.ForeignKey(
        TechnicianModel,
        related_name='appointments',
        on_delete=models.CASCADE
        )

    reason = models.TextField()
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.SCHEDULED,
    )

    def __str__(self):
        return f"{self.customer_name} {self.vin}"
