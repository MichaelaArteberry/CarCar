import React, { useState, useEffect } from "react";

const AddTechnician = () => {
    const [technician, setTechnician] = useState({
    });

    const [firstName, setFirstName] = useState('');
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const [lastName, setLastName] = useState('');
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const [employeeId, setEmployeeId] = useState('');
    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        console.log(data);
        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();
            console.log(newTechnician);

            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnician(data.technicians);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <div className="mb-3">
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <label htmlFor="first_name" className="form-label">First Name:</label>
                                <input required className="form-control" name="first_name" id="first_name" type="text" value={technician.first_name} onChange={handleFirstNameChange} />
                            </div>

                            <div className="form-floating mb-3">
                                <label htmlFor="last_name" className="form-label">Last Name:</label>
                                <input required className="form-control" name="last_name" id="last_name" type="text" value={technician.last_name} onChange={handleLastNameChange} />
                            </div>

                            <div className="form-floating mb-3">
                                <label htmlFor="employee_id" className="form-label">Employee ID:</label>
                                <input required className="form-control" name="employee_id" id="employee_id" type="text" value={technician.employee_id} onChange={handleEmployeeIdChange} />
                            </div>

                            <button className="btn btn-primary" type="submit">Add Technician</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTechnician;
