from django.contrib import admin
from .models import AutomobileVO, Customer, Sale, Salesperson

# Register your models here.
@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "first_name",
        "last_name",
        "employee_id",
    )

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "first_name",
        "last_name",
        "phone_number",
    )

@admin.register(Sale)
class SalespersonAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "price",
        "automobile",
        "salesperson",
        "customer",
    )
