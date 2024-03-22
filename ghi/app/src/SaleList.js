import React, { useEffect, useState } from "react";

function SaleList() {
  const [sale, setSale] = useState([]);
  const [salesperson, setSalesperson] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [automobile, setAutomobile] = useState([]);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/sales/");
        if (!response.ok) throw new Error("Failed to fetch sale");

        const data = await response.json();
        setSale(data.sale);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchSale();
  }, []);

  useEffect(() => {
    const fetchSalesperson = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/salespeople/");
        if (!response.ok) throw new Error("Failed to fetch salesperson");

        const data = await response.json();
        setSalesperson(data.salesperson);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchSalesperson();
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/customers/");
        if (!response.ok) throw new Error("Failed to fetch customer");

        const data = await response.json();
        setCustomer(data.customer);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCustomer();
  }, []);

  useEffect(() => {
    const fetchAutomobile = async () => {
      try {
        const response = await fetch("http://localhost:8100/api/automobiles/");
        if (!response.ok) throw new Error("Failed to fetch automobile");

        const data = await response.json();
        setAutomobile(data.automobile);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAutomobile();
  }, []);

  const onDelete = (id) => {
    return async () => {
      await fetch(`http://localhost:8090/api/sales/${id}/`, {
        method: "delete",
      });
      alert("get outta here!");
      window.location.reload();
    };
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Salesperson Name</th>
          <th>Customer</th>
          <th>VIN</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {sale?.map((sale) => {
          return (
            <tr key={sale.id}>
              <td>{sale.salesperson.employee_id}</td>
              <td>
                {sale.salesperson.first_name} {sale.salesperson.last_name}
              </td>
              <td>
                {sale.customer.first_name} {sale.customer.last_name}
              </td>
              <td>{sale.automobile.vin}</td>
              <td>{sale.price}</td>
              <td>
                <button className="btn-danger" onClick={onDelete(sale.id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SaleList;
