import React from "react";
import { useEffect, useState } from "react";

const ListAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const handleCancel = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/${id}/cancel/`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      } else {
        console.error("Failed to cancel appointment:", response.statusText);
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  const handleFinish = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/${id}/finish/`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      } else {
        console.error("Failed to finish appointment:", response.statusText);
      }
    } catch (error) {
      console.error("Error finishing appointment:", error);
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/appointments/");
        if (!response.ok)
          throw new Error("Failed to fetch list of appointments");
        const data = await response.json();
        setAppointments(data.appointments);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAppointments();
  }, []);

    return (
      <div className="bg-img">
        <div className="bg-overlay"></div>
        <div className="container py-4 mt-5">
        <div className="row">
          <div className="col-md-12">
          <div className="card shadow">
          <div className="card-body">
          <h3 className="card-title text-center">Service Appointments</h3>
          <table className="table table-light table-hover mt-5">
            <thead>
              <tr>
                <th>VIN</th>
                <th>Is VIP?</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Technician</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => {
                let dateTime = new Date(appointment.date_time);
                const date = dateTime.toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                });
                const time = dateTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });
                return (
                  <tr key={appointment.id}>
                    <td>{appointment.vin}</td>
                    <td>{appointment.is_vip ? "Yes" : "No"}</td>
                    <td>{appointment.customer_name}</td>
                    <td>{date}</td>
                    <td>{time}</td>
                    <td>{appointment.reason}</td>
                    <td>
                      {appointment.technician.first_name}{" "}
                      {appointment.technician.last_name}
                    </td>
                    <td>
                      {appointment.status !== "finished" && (
                        <button
                          className="btn btn-outline-danger me-2"
                          onClick={() => handleCancel(appointment.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                    <td>
                      {appointment.status !== "finished" && (
                        <button
                          className="btn btn-outline-success"
                          onClick={() => handleFinish(appointment.id)}
                        >
                          Finish
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default ListAppointments;
