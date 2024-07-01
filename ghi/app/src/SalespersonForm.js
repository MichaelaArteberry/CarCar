import React, { useEffect, useState } from "react";

function SalespersonForm() {
  const [, setAutomobiles] = useState([]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    employee_id: "",
  });

  const fetchData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.automobiles);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "http://localhost:8090/api/salespeople/";

    const fetchConfig = {
      method: "post",

      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setFormData({
        first_name: "",
        last_name: "",
        employee_id: "",
      });
    }
  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,

      [inputName]: value,
    });
  };

  return (
    <div className="bg-img">
      <div className="bg-overlay"></div>
      <div className="container py-4 mt-5">
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center">Add a salesperson</h3>
                <form onSubmit={handleSubmit} id="create-salesperson-form">
                  <div className="mb-3">
                    <label htmlFor="first_name">First Name:</label>
                    <input
                      onChange={handleFormChange}
                      value={formData.first_name}
                      required
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                      onChange={handleFormChange}
                      value={formData.last_name}
                      required
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="employee_id">Employee ID:</label>
                    <input
                      onChange={handleFormChange}
                      value={formData.employee_id}
                      required
                      type="text"
                      name="employee_id"
                      id="employee_id"
                      className="form-control"
                    />
                  </div>
                  <button className="btn btn-outline-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalespersonForm;
