from django.urls import path
from .api_views import (
    api_list_technicians,
    api_list_appointments,
    api_detail_appointment,
    api_status_cancel,
    api_status_finish,
    api_detail_technicians
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_detail_technicians, name="api_detail_technicians"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/", api_detail_appointment, name="api_detail_appointment"),
    path("appointments/<int:pk>/cancel/", api_status_cancel, name="api_status_cancel"),
    path("appointments/<int:pk>/finish/", api_status_finish, name="api_status_finish"),
]
