import React, { useEffect, useState } from "react";

function ModelList() {
  const [model, setModel] = useState([]);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch("http://localhost:8100/api/models/");
        if (!response.ok) throw new Error("Failed to fetch model");

        const data = await response.json();
        setModel(data.models);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchModel();
  }, []);

  const onDelete = (id) => {
    return async () => {
      await fetch(`http://localhost:8100/api/models/${id}/`, {
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
          <th>Manufacturer</th>
          <th>Picture</th>
        </tr>
      </thead>
      <tbody>
        {model?.map((model) => {
          return (
            <tr className="text-center" key={model.id}>
              <td>{model.name}</td>
              <td>{model.manufacturer.name}</td>
              <td>
                <img className="img-thumbnail max-width: 100% height: auto;" src={model.picture_url} />
              </td>
              <td>
                <button className="btn btn-outline-danger" onClick={onDelete(model.id)}>
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

export default ModelList;
