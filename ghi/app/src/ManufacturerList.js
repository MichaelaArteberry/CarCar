import React, { useEffect, useState } from "react";

function ManufacturerList() {
  const [manufacturer, setManufacturer] = useState([]);

  useEffect(() => {
    const fetchManufacturer = async () => {
      try {
        const response = await fetch(
          "http://localhost:8100/api/manufacturers/"
        );
        if (!response.ok) throw new Error("Failed to fetch manufacturer");

        const data = await response.json();
        setManufacturer(data.manufacturers);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchManufacturer();
  }, []);

  const onDelete = (id) => {
    return async () => {
      await fetch(`http://localhost:8100/api/manufacturers/${id}/`, {
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
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {manufacturer?.map((manufacturer) => {
          return (
            <tr className="text-center" key={manufacturer.id}>
              <td>{manufacturer.name}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={onDelete(manufacturer.id)}
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

export default ManufacturerList;
