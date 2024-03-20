import React from 'react';
import { useEffect, useState } from "react";


const ListAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/appointments/");
                if (!response.ok) throw new Error("Failed to fetch list of appointments");

                const data = await response.json();
                setAppointments(data.appointments);

            } catch (error) {
                console.error(error.message);
            }
        };
        fetchAppointments();
    }, []);
console.log(appointments);
    return (
        <div>
            <h2>Service Appointments</h2>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer Name</th>
                        <th>Date/Time</th>
                        <th>Reason</th>
                        <th>Technician</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.is_vip ? "Yes" : "No"}</td>
                            <td>{appointment.customer_name}</td>
                            <td>{appointment.date_time}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                            <td><button className="btn btn-danger">Cancel</button></td>
                            <td><button className="btn btn-success">Finish</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default ListAppointments;
