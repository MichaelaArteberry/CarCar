import React, { useEffect, useState } from "react";

function CustomerForm() {
  const [locations, setLocations] = useState([]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
  });

  const fetchData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "http://localhost:8090/api/customers/";

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
        phone_number: "",
        address: "",
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
    <div className="row mt-5">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a customer</h1>
          <form onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.first_name}
                placeholder="First_name"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="first_name">First Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.last_name}
                placeholder="Last_name"
                required
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.phone_number}
                placeholder="Phone_number"
                required
                type="text"
                name="phone_number"
                id="phone_number"
                className="form-control"
              />
              <label htmlFor="phone_number">Phone Number</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.address}
                placeholder="Address"
                required
                type="text"
                name="address"
                id="address"
                className="form-control"
              />
              <label htmlFor="address">Address</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
