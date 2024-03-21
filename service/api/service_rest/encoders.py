from common.json import ModelEncoder
from service_rest.models import AutomobileVO, TechnicianModel, AppointmentModel


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['import_href', 'vin_number', 'sold']


class TechnicianModelEncoder(ModelEncoder):
    model = TechnicianModel
    properties = ['id', 'first_name', 'last_name', 'employee_id']


class AppointmentListEncoder(ModelEncoder):
    model = AppointmentModel
    properties = [
        "id",
        "customer_name",
        "vip",
        "vin",
        "technician",
        "reason",
        "date_time",
        "status",
    ]
    encoders = { "technician": TechnicianModelEncoder() }


class AppointmentDetailEncoder(ModelEncoder):
    model = AppointmentModel
    properties = [
        "id",
        "customer_name",
        "vip",
        "vin",
        "technician",
        "reason",
        "date_time",
        "status",
    ]
    encoders = { "technician": TechnicianModelEncoder() }
