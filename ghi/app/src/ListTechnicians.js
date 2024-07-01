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
    <div className="bg-img">
      <div className="bg-overlay"></div>
      <div className="container py-4 mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="text-center mt-3 p-3 card-title">Technicians</h2>
                <table className="table table-light table-hover">
                  <thead>
                    <tr className="text-center">
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Action</th>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechList;
