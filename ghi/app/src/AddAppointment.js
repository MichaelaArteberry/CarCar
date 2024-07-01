import React, { useState, useEffect } from "react";

function CreateAppointment() {
  const initialState = {
    vin: "",
    customer_name: "",
    date: "",
    time: "",
    technician: "",
    reason: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      const url = "http://localhost:8080/api/technicians/";

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
      }
    };

    fetchTechnicians();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const appointmentInfo = {
      vin: formData.vin,
      customer_name: formData.customer_name,
      date_time: `${formData.date}T${formData.time}:00Z`,
      technician: formData.technician,
      reason: formData.reason,
    };

    try {
      const response = await fetch("http://localhost:8080/api/appointments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentInfo),
      });
      if (!response.ok) {
        throw new Error("Error creating appointment");
      }
      setFormData(initialState);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-img">
      <div className="bg-overlay"></div>
      <div className="container py-4 mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title mb-4">Create Appointment</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="customerName" className="form-label">
                      Customer Name
                    </label>
                    <input
                      required
                      className="form-control"
                      name="customer_name"
                      id="customerName"
                      type="text"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="automobileVin" className="form-label">
                      Automobile VIN
                    </label>
                    <input
                      required
                      className="form-control"
                      name="vin"
                      id="automobileVin"
                      type="text"
                      value={formData.vin}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Date
                    </label>
                    <input
                      required
                      className="form-control"
                      name="date"
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="time" className="form-label">
                      Time
                    </label>
                    <input
                      required
                      className="form-control"
                      name="time"
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="reason" className="form-label">
                      Reason for Appointment
                    </label>
                    <input
                      required
                      className="form-control"
                      name="reason"
                      id="reason"
                      type="text"
                      value={formData.reason}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="technician" className="form-label">
                      Technician
                    </label>
                    <select
                      required
                      className="form-select"
                      name="technician"
                      id="technician"
                      value={formData.technician}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a technician</option>
                      {technicians.map((tech) => (
                        <option key={tech.employee_id} value={tech.employee_id}>
                          {tech.first_name} {tech.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Create Appointment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAppointment;
