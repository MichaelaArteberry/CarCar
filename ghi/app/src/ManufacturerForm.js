import React, { useEffect, useState } from "react";

function ManufacturerForm() {
  const [locations, setLocations] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
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

    const url = "http://localhost:8100/api/manufacturers/";

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
        name: "",
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
                <h1 className="text-center card-title mb-4">
                  Add a manufacturer
                </h1>
                <form onSubmit={handleSubmit} id="create-manufacturer-form">
                  <div className="form-floating mb-3">
                    <input
                      onChange={handleFormChange}
                      value={formData.name}
                      placeholder="name"
                      required
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                    />
                    <label htmlFor="name">Name</label>
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

export default ManufacturerForm;
