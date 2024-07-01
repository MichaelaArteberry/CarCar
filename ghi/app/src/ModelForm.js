import React, { useEffect, useState } from "react";

function ModelForm() {
  const [manufacturer, setManufacturer] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    manufacturer_id: "",
    picture_url: "",
  });

  const fetchData = async () => {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setManufacturer(data.manufacturers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "http://localhost:8100/api/models/";

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
        manufacturer_id: "",
        picture_url: "",
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
                <h3 className="card-title text-center">Add a model</h3>
                <form onSubmit={handleSubmit} id="create-model-form">
                  <div className="mb-3">
                    <label htmlFor="name">Name:</label>
                    <input
                      onChange={handleFormChange}
                      value={formData.name}
                      placeholder="Name"
                      required
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="picture_url">Picture URL:</label>
                    <input
                      onChange={handleFormChange}
                      value={formData.picture_url}
                      placeholder="Picture URL"
                      required
                      type="text"
                      name="picture_url"
                      id="picture_url"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      value={formData.manufacturer_id}
                      onChange={handleFormChange}
                      required
                      name="manufacturer_id"
                      id="manufacturer_id"
                      className="form-select"
                    >
                      <option value="">Choose a manufacturer</option>
                      {manufacturer.map((manufacturer) => (
                        <option key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.name}
                        </option>
                      ))}
                    </select>
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

export default ModelForm;
