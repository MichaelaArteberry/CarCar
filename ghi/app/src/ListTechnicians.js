import React from "react";
import { useEffect, useState } from "react";

const TechList = () => {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/technicians/");
        if (!response.ok) throw new Error("Failed to fetch technicians");
        const data = await response.json();
        setTechnicians(data.technicians);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTechnicians();
  }, []);

  const onDelete = (id) => {
    return async () => {
      await fetch(`http://localhost:8080/api/technicians/${id}/`, {
        method: "delete",
      });
      alert("delete successful");
      window.location.reload();
    };
  };

  return (
    <div className="mt-5">
      <h2 className="text-center mt-3 p-3">Technicians</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr className="text-center">
            <th>Employee ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => (
            <tr className="text-center" key={technician.id}>
              <td>{technician.employee_id}</td>
              <td>
                {technician.first_name} {technician.last_name}
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={onDelete(technician.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TechList;
