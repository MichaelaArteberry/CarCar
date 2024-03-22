# CarCar

## Team

- Michaela Arteberry - Service
- Justin Cosby - Sales

## Design
![alt text](image.png)
### Service Microservice

Below are the models and how they are interacted with:

1. Technician Model: Represents the technician responsible for servicing the automobiles.
    - Fields: first_name, last_name, employee_id.

2. Appointment Model: Represents the appointment and time slot for the automobile to receive service.
    - Fields: customer_name, vin, vip, date, time, technician, reason, status.

#### How it works with the Inventory Microservice

- Creation and Update: Appointments can be created or updated.
- Automobile Existence Check: Automobile existence can be checked using the VIN from the inventory microservice.
- VIP Marking: Vehicles can be marked as VIP based on whether they have been sold or not.


## Bounded Contexts

In the microservice for Automobile Service, a specific Bounded Context called "Service Appointment Management" has been established to oversee the entire lifecycle of appointments for automobile servicing. This distinct context consolidates all functions related to managing service appointments, enhancing organizational clarity and the separation of concerns within the microservice architecture. By confining appointment-related processes within this context, maintaining and expanding the service becomes more efficient, minimizing the risk of impacting other system elements.

## Value Objects

Within the confined realm of Service Appointment Management, the Technician and Appointment objects function as value entities embodying core concepts in the domain. Technicians encapsulate data about individuals responsible for automobile servicing, including their names and employee IDs. Appointments encapsulate details about scheduled service appointments, such as customer information, appointment date and time, assigned technicians, and appointment status. By modeling these entities as value objects, we ensure their immutability and self-containment, facilitating clearer comprehension and management of appointment-related operations within the service microservice. Additionally, the AutomobileVO entity represents an Automobile Value Object fetched from the Inventory microservice, containing essential information about automobiles in the system.


## Urls used in Service Microservice
<img align="center" src="service-urls.png" height="100" />

### Sales Microservice

We created Value Objects for each model in the inventory microservice, which then assist us in our sales and service api(back-end). These models are used to create and display the information on our web browser(front-end).

## Steps to run Application

1. fork then clone the gitlab to your terminal
2. run "docker compose up --build" to build and start docker
3. run "code ." to see the code on VSCode

## URLs

In the "ghi" app, in "src", there will be a Nav.js file with the subfolder/subdirectories of each url(http://localhost:3000/). Each NavLink will be paired with a component created to its subfolder.

Locally on insomnia, user can follow this chart(![alt text](image-1.png)) to understand what each CRUD Route is used for. In insomnia, the data that is stored should be used as a guideline to create new data, if user wants to add more items.

## Bounded Contexts

In the microservice for Automobile Sales, this bounded context consolidates all functions related to sales(sales app and the components in ghi/src that involves sales, salesperson, and customer.) Sales and Service can each be modified without effecting the other.

## Value Objects

In sales, the automobile model was used as a value object from inventory to assist in data that was used for the models in sales_rest.
