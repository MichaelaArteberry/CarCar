import React, { useState, useEffect } from "react";

function CreateAppointment() {
    const initialState = {
        vin: "",
        customer_name: "",
        date: "",
        time: "",
        technician: "",
        reason: ""
    };

    const [formData, setFormData] = useState(initialState);
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        const fetchTechnicians = async () => {
            const url = 'http://localhost:8080/api/technicians/';

            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setTechnicians(data.technicians);
            }
        }

        fetchTechnicians();
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();
        const appointmentInfo = {
            vin: formData.vin,
            customer_name: formData.customer_name,
            date_time: `${formData.date}T${formData.time}:00Z`,
            technician: formData.technician,
            reason: formData.reason
        };

        try {
            const response = await fetch("http://localhost:8080/api/appointments/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(appointmentInfo)
            });
            if (!response.ok) {
                throw new Error("Error creating appointment");
            }
            setFormData(initialState);
        } catch (error) {console.error("Error", error);
        }
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <div className="mb-3">
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <div>
                                    <label htmlFor="customerName" className="form-label">Customer Name</label>
                                </div>
                                <input required className="form-control" name="customer_name" id="customerName" type="text" value={formData.customer_name} onChange={handleInputChange} />
                            </div>
                            <div className="form-floating mb-3">
                                <div>
                                    <label htmlFor="automobileVin" className="form-label">Automobile VIN:</label>
                                </div>
                                <input required className="form-control" name="vin" id="automobileVin" type="text" value={formData.vin} onChange={handleInputChange} />
                            </div>
                            <div className="form-floating mb-3">
                                <div>
                                    <label htmlFor="date" className="form-label">Date:</label>
                                </div>
                                <input required className="form-control" name="date" id="date" type="date" value={formData.date} onChange={handleInputChange} />
                            </div>
                            <div className="form-floating mb-3">
                                <div>
                                    <label htmlFor="time" className="form-label">Time:</label>
                                </div>
                                <input required className="form-control" name="time" id="time" type="time" value={formData.time} onChange={handleInputChange} />
                            </div>
                            <div className="form-floating mb-3">
                                <div>
                                    <label htmlFor="reason" className="form-label">Reason for Appointment:</label>
                                </div>
                                <input required className="form-control" name="reason" id="reason" type="text" value={formData.reason} onChange={handleInputChange} />
                            </div>
                            <div className="form-floating mb-3">
                                <div>
                                    <label htmlFor="technician" className="form-label">Technician:</label>
                                </div>
                                <select required className="form-select" name="technician" id="technician" value={formData.technician} onChange={(e) => setFormData({ ...formData, technician: e.target.value })}>
                                    <option value="">Select a technician</option>
                                    {technicians.map((tech) => {
                                        return <option key={tech.employee_id} value={tech.employee_id}>{tech.first_name} {tech.last_name}</option>
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary" type="submit">Create Appointment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAppointment;
