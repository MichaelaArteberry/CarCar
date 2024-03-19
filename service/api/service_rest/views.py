from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from .models import AutomobileVO, TechnicianModel, AppointmentModel

# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['import_href', 'vin_number']

class TechnicianModelEncoder(ModelEncoder):
    model = TechnicianModel
    properties = ['first_name', 'last_name', 'employee_id']

class AppointmentListEncoder(ModelEncoder):
    model = AppointmentModel
    properties = [
        "id",
        "customer_name",
        "vip",
        "vin",
        "technician",
        "reason",
        "date",
        "time",
        "status",
    ]
    encoders = {"technician": TechnicianModelEncoder()}


class AppointmentDetailEncoder(ModelEncoder):
    model = AppointmentModel
    properties = [
        "id",
        "customer_name",
        "vip",
        "vin",
        "technician",
        "reason",
        "date",
        "status",
    ]
    encoders = {"technician": TechnicianModelEncoder()}


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = TechnicianModel.objects.all()
        return JsonResponse({"technicians": technicians}, encoder=TechnicianModelEncoder, safe=False)
    else:
        content = json.loads(request.body)
        try:
            technician = TechnicianModel.objects.create(**content)
            return JsonResponse(technician, encoder=TechnicianModelEncoder, safe=False)
        except Exception as e:
            return JsonResponse({"message": "Error creating technician."}, status=400, safe=False)


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = AppointmentModel.objects.all()

        return JsonResponse(
            {"appointments": appointments}, encoder=AppointmentListEncoder
        )
    else:
        content = json.loads(request.body)

        technician = TechnicianModel.objects.get(employee_id=content["technician"])
        content["technician"] = technician

        try:
            vin = AutomobileVO.objects.get(vin=content["vin"])
            content["vip"] = True
        except AutomobileVO.DoesNotExist:
            content["vip"] = False

        appointment = AppointmentModel.objects.create(**content)

        return JsonResponse(appointment, encoder=AppointmentDetailEncoder, safe=False)


@require_http_methods(["GET", "PUT", "DELETE"])
def api_detail_appointment(request, pk):
    if request.method == "GET":
        appointment = AppointmentModel.objects.get(id=pk)
        return JsonResponse(appointment, encoder=AppointmentDetailEncoder, safe=False)
    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            if "technician" in content:
                technician = TechnicianModel.objects.get(id=content["technician"])
                content["technician"] = technician
        except TechnicianModel.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist"})
        AppointmentModel.objects.filter(id=pk).update(**content)

        appointment = AppointmentModel.objects.get(id=pk)

        return JsonResponse(appointment, encoder=AppointmentDetailEncoder, safe=False)
    else:
        count, _ = AppointmentModel.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
