import React, { useEffect, useState } from "react";

function SalespersonList() {
  const [salesperson, setSalesperson] = useState([]);

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

  const onDelete = (id) => {
    return async () => {
      await fetch(`http://localhost:8090/api/salespeople/${id}/`, {
        method: "delete",
      });
      alert("get outta here!");
      window.location.reload();
    };
  };

  return (
    <table className="table table-striped table-hover mt-5">
      <thead>
        <tr className="text-center">
          <th>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {salesperson?.map((salesperson) => {
          return (
            <tr className="text-center" key={salesperson.id}>
              <td>{salesperson.employee_id}</td>
              <td>{salesperson.first_name}</td>
              <td>{salesperson.last_name}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={onDelete(salesperson.id)}
                >
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

export default SalespersonList;
