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
    <div className="bg-img">
      <div className="bg-overlay"></div>
      <div className="container py-4 mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title mb-4 text-center">Model List</h3>
                <table className="table table-striped table-hover mt-5">
                  <thead>
                    <tr className="text-center">
                      <th>Name</th>
                      <th>Manufacturer</th>
                      <th>Picture</th>
                    </tr>
                  </thead>
                  <tbody>
                    {model?.map((model) => (
                      <tr className="text-center" key={model.id}>
                        <td>{model.name}</td>
                        <td>{model.manufacturer.name}</td>
                        <td>
                          <img
                            className="img-thumbnail"
                            src={model.picture_url}
                            alt={model.name}
                            style={{ maxWidth: "200px", maxHeight: "150px" }}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-danger"
                            onClick={onDelete(model.id)}
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
}

export default ModelList;
