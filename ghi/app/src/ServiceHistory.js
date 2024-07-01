import React, { useState, useEffect } from "react";

function ServiceHistory() {
  const [searchVin, setSearchVin] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch("http://localhost:8080/api/appointments/");
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments);
        setFilteredAppointments(data.appointments);
      }
    };
    fetchAppointments();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = appointments.filter((appointment) =>
      appointment.vin.toLowerCase().includes(searchVin.toLowerCase())
    );
    setFilteredAppointments(filtered);
  };

  filteredAppointments.sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}Z`);
    const dateTimeB = new Date(`${b.date}T${b.time}Z`);
    return dateTimeA - dateTimeB;
  });

  return (
    <div className="bg-img">
      <div className="bg-overlay"></div>
      <div className="container py-4 mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center p-3">Service History</h3>
                <form onSubmit={handleSearch}>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by VIN"
                      value={searchVin}
                      onChange={(e) => setSearchVin(e.target.value)}
                    />
                    <div className="input-group-append p-2">
                      <button
                        className="btn btn-outline-primary m-2"
                        type="submit"
                      >
                        Search
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => {
                          setSearchVin("");
                          setFilteredAppointments(appointments);
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </form>
                <table className="table table-striped table-hover ">
                  <thead>
                    <tr className="text-center">
                      <th>VIN</th>
                      <th>Is VIP?</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Reason</th>
                      <th>Technician</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => {
                        const dateTime = new Date(appointment.date_time);
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
                          <tr className="text-center" key={appointment.id}>
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
                            <td>{appointment.status}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="text-center">
                        <td>No appointments found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ServiceHistory;
