import React, { useEffect, useState } from "react";

function AutomobileList() {
  const [automobile, setAutomobile] = useState([]);

  useEffect(() => {
    const fetchAutomobile = async () => {
      try {
        const response = await fetch("http://localhost:8100/api/automobiles/");
        if (!response.ok) throw new Error("Failed to fetch automobile");

        const data = await response.json();
        setAutomobile(data.autos);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAutomobile();
  }, []);

  const onDelete = (id) => {
    return async () => {
      await fetch(`http://localhost:8100/api/automobiles/${id}/`, {
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
          <th>VIN</th>
          <th>Color</th>
          <th>Year</th>
          <th>Model</th>
          <th>Manufacturer</th>
          <th>Sold</th>
        </tr>
      </thead>
      <tbody>
        {automobile?.map((automobile) => {
          return (
            <tr className="text-center" key={automobile.id}>
              <td>{automobile.vin}</td>
              <td>{automobile.color}</td>
              <td>{automobile.year}</td>
              <td>{automobile.model.name}</td>
              <td>{automobile.model.manufacturer.name}</td>
              <td>{automobile.sold}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={onDelete(automobile.id)}
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

export default AutomobileList;
