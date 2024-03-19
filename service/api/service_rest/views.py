from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from .models import AutomobileVO, TechnicianModel, AppointmentModel

# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin_number']

class TechnicianModelEncoder(ModelEncoder):
    model = TechnicianModel
    properties = ['first_name', 'last_name', 'employee_id']

class AppointmentModelEncoder(ModelEncoder):
    model = AppointmentModel
    properties = ['date_time', 'reason', 'status', 'vin', 'customer', 'technician']


@require_http_methods(["GET", "POST"])
def api_list_technicians(request, employee_id=None):
    if request.method == "GET":
        if employee_id is not None:
            technician  = TechnicianModel.objects.get(id=employee_id)
        else:
            technicians = TechnicianModel.objects.all()

        return JsonResponse({"Technicians": technicians}, TechnicianModelEncoder, safe=False)
    else:
        content = json.loads(request.body)
        try:
            tech_href = content["technician"]
            technician = AutomobileVO.objects.get(import_href=tech_href)
            content["technician"] = technician
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Technician not found."}, status=400, safe=False)

        technicians = TechnicianModel.objects.create(**content)
        return JsonResponse(
            technicians,
            encoder=TechnicianModelEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_details_technicians (request, employee_id):
    if request.method == "GET":
        try:
            technician = TechnicianModel.objects.get(id=employee_id)
            return JsonResponse(
                technician,
                encoder=TechnicianModelEncoder,
                safe=False
            )
        except TechnicianModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

# DELETE to delete a technician

    elif request.method == "DELETE":
        try:
            technician = TechnicianModel.objects.get(id=employee_id)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianModelEncoder,
                safe=False,
            )
        except TechnicianModel.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})

# PUT to update a technician
    else:
        try:
            content = json.loads(request.body)
            technician = TechnicianModel.objects.get(id=employee_id)

            props = ["first_name", "last_name", "employee_id"]
            for prop in props:
                if prop in content:
                    setattr(technician, prop, content[prop])
            technician.save()

            return JsonResponse(
                technician,
                encoder=TechnicianModelEncoder,
                safe=False,
            )

        except TechnicianModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_appointments(request, vin=None):
    if request.method == "GET":
        if vin is not None:
            appointment = AppointmentModel.objects.get(vin=vin)
        else:
            appointments = AppointmentModel.objects.all()
        return JsonResponse({"Appointments": appointments}, encoder=AppointmentModelEncoder, safe=False)

    else:
        content = json.loads(request.body)
        try:
            vin = content["vin"]
            automobile = AutomobileVO.objects.get(vin=vin)
            content["vin"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Automobile not found."}, status=400, safe=False)

        appointment = AppointmentModel.objects.create(**content)
        return JsonResponse(appointment, encoder=AppointmentModelEncoder, safe=False)


@require_http_methods(["GET", "PUT", "DELETE"])
def api_details_appointments(request, appointment_id):
    if request.method == "GET":
        appointment = AppointmentModel.objects.get(id=appointment_id)
        return JsonResponse(appointment, encoder=AppointmentModelEncoder, safe=False)

    elif request.method == "PUT":
        content = json.loads(request.body)
        appointment = AppointmentModel.objects.get(id=appointment_id)

        for key, value in content.items():
            setattr(appointment, key, value)
        appointment.save()
        return JsonResponse(appointment, encoder=AppointmentModelEncoder, safe=False)

    elif request.method == "DELETE":
        appointment = AppointmentModel.objects.get(id=appointment_id)
        appointment.delete()
        return JsonResponse({"message": "Appointment deleted."}, safe=False)
    else:
        return JsonResponse({"message": "Method not allowed."}, status=405, safe=False)
