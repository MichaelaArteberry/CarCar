from django.urls import path
from sales_rest.views import api_list_customer, api_list_sale, api_list_salesperson, api_show_customer, api_show_sale, api_show_salesperson

urlpatterns = [
    path("salespeople/", api_list_salesperson, name="api_list_salesperson"),
    path("salespeople/<int:pk>/", api_show_salesperson,name="api_show_salesperson"),
    path("customers/", api_list_customer, name="api_list_customer"),
    path("customers/<int:pk>/", api_show_customer,name="api_show_customer"),
    path("sales/", api_list_sale, name="api_list_sale"),
    path("sales/<int:pk>/", api_show_sale,name="api_show_sale"),
]
