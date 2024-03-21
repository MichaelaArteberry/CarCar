from django.http import JsonResponse
from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json
from sales_rest.models import AutomobileVO, Customer, Sale, Salesperson


# Create your views here.

class AutomobileEncoderVO(ModelEncoder):
    model = AutomobileVO
    properties = ['import_href', 'vin']

class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "phone_number",
        "address",
    ]

class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "phone_number",
        "address",
    ]

class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "automobile",
        "salesperson",
        "customer",
    ]
    encoders = {
        "automobile": AutomobileEncoderVO(),
        "salesperson": SalespersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),
    }

class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "salesperson",
        "customer",
    ]
    encoders = {
        "automobile": AutomobileEncoderVO(),
        "salesperson": SalespersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(salesperson, encoder=SalespersonDetailEncoder, safe=False)
        except:
            return JsonResponse(
                {"message": "Error creating salesperson."},
                status=400,
                safe=False
                )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_salesperson(request, pk):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonDetailEncoder,
        )
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "salesperson" in content:
                salesperson = Salesperson.objects.get(id=content["salesperson"])
                content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile id"},
                status=400,
            )

        Salesperson.objects.filter(id=pk).update(**content)
        salesperson = Salesperson.objects.get(id=pk)
        return JsonResponse(
            salesperson,
            encoder=SalespersonDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(customer, encoder=CustomerDetailEncoder, safe=False)
        except:
            return JsonResponse(
                {"message": "Error creating customer."},
                status=400,
                safe=False
                )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_customer(request, pk):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerDetailEncoder,
        )
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "customer" in content:
                customer = Customer.objects.get(id=content["customer"])
                content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=400,
            )

        Customer.objects.filter(id=pk).update(**content)
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_sale(request):
    if request.method == "GET":
        sale = Sale.objects.all()
        return JsonResponse(
            {"sale": sale},
            encoder=SaleListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            sale = Sale.objects.create(**content)
            return JsonResponse(sale, encoder=SaleDetailEncoder, safe=False)
        except:
            return JsonResponse(
                {"message": "Error creating sale."},
                status=400,
                safe=False
                )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_sale(request, pk):
    if request.method == "GET":
        sale = Customer.objects.all()
        return JsonResponse(
            {"sale": sale},
            encoder=SaleDetailEncoder,
        )
    elif request.method == "DELETE":
        count, _ = Sale.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "sale" in content:
                sale = Sale.objects.get(id=content["sale"])
                content["sale"] = sale
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sale id"},
                status=400,
            )

        Sale.objects.filter(id=pk).update(**content)
        sale = Sale.objects.get(id=pk)
        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False,
        )
