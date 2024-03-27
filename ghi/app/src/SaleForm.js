import React, { useEffect, useState } from "react";

function SaleForm() {
  const [filteredAutomobile, setFilteredAutomobile] = useState([]);
  const [automobile, setAutomobile] = useState([]);
  const [salesperson, setSalesperson] = useState([]);
  const [customer, setCustomer] = useState([]);

  const [formData, setFormData] = useState({
    price: "",
    automobile: "",
    salesperson: "",
    customer: "",
  });

  const fetchAutomobile = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutomobile(data.autos);
    }
  };

  useEffect(() => {
    fetchAutomobile();
  }, []);

  const fetchAuto = () => {
    const filteredAutomobile = automobile.filter(
      (autos) => autos.sold === false
    );
    setFilteredAutomobile(filteredAutomobile);
  };

  useEffect(() => {
    fetchAuto();
  }, []);

  const fetchSalesperson = async () => {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalesperson(data.salesperson);
    }
  };

  useEffect(() => {
    fetchSalesperson();
  }, []);

  const fetchCustomer = async () => {
    const url = "http://localhost:8090/api/customers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCustomer(data.customer);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "http://localhost:8090/api/sales/";

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
        price: "",
        automobile: "",
        salesperson: "",
        customer: "",
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
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a sale</h1>
          <form onSubmit={handleSubmit} id="create-sale-form">
            <div className="mb-3">
              <select
                value={formData.automobile}
                onChange={handleFormChange}
                required
                name="automobile"
                id="automobile"
                className="form-select"
              >
                <option value="">Automobile VIN</option>
                {automobile?.map((autos) => {
                  return (
                    <option key={autos.vin} value={autos.vin}>
                      {autos.vin}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                value={formData.salesperson}
                onChange={handleFormChange}
                required
                name="salesperson"
                id="salesperson"
                className="form-select"
              >
                <option value="">Choose a salesperson</option>
                {salesperson?.map((salesperson) => {
                  return (
                    <option
                      key={salesperson.id}
                      value={salesperson.employee_id}
                    >
                      {salesperson.first_name} {salesperson.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                value={formData.customer}
                onChange={handleFormChange}
                required
                name="customer"
                id="customer"
                className="form-select"
              >
                <option value="">Choose a customer</option>
                {customer?.map((customer) => {
                  return (
                    <option
                      key={customer.first_name}
                      value={customer.id}
                    >
                      {customer.first_name} {customer.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.price}
                placeholder="Price"
                required
                type="text"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SaleForm;
