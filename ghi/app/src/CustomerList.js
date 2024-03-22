import React, { useEffect, useState } from "react";

function CustomerList() {
  const [customer, setCustomer] = useState([]);

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

  const onDelete = (id) => {
    return async () => {
      await fetch(`http://localhost:8090/api/customers/${id}/`, {
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
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {customer?.map((customer) => {
          return (
            <tr key={customer.id}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.phone_number}</td>
              <td>{customer.address}</td>
              <td>
                <button className="btn-danger" onClick={onDelete(customer.id)}>
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

export default CustomerList;
