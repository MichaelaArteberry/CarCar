import React, { useEffect, useState } from 'react';

function AutomobileForm() {
  const [models, setModel] = useState([])
  const [autos, setAuto] = useState([])

  //Notice that we can condense all formData
  //into one state object
  const [formData, setFormData] = useState({
    color: '',
    year: '',
    vin: '',
    models: '',
  })

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModel(data.models);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8100/api/automobiles/';

    const fetchConfig = {
      method: "post",
      //Because we are using one formData state object,
      //we can now pass it directly into our request!
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      //The single formData object
      //also allows for easier clearing of data
      setFormData({
        color: '',
        year: '',
        vin: '',
        models: '',
      });
    }
  }

  //Notice that we can also replace multiple form change
  //eventListener functions with one
  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    //We can condense our form data event handling
    //into on function by using the input name to update it

    setFormData({
      //Previous form data is spread (i.e. copied) into our new state object
      ...formData,

      //On top of the that data, we add the currently engaged input key and value
      [inputName]: value
    });
  }
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add an Automobile to Inventory</h1>
          <form onSubmit={handleSubmit} id="create-automobile-form">

            <div className="form-floating mb-3">
              {/* <!-- Now, each field in our form references the same function --> */}
              <input onChange={handleFormChange} value={formData.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="color">Color</label>
            </div>

            <div className="form-floating mb-3">
              {/* <!-- Now, each field in our form references the same function --> */}
              <input onChange={handleFormChange} value={formData.year} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
              <label htmlFor="year">Year</label>
            </div>

            <div className="form-floating mb-3">
              {/* <!-- Now, each field in our form references the same function --> */}
              <input onChange={handleFormChange} value={formData.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="mb-3">
              <select value={formData.models} onChange={handleFormChange} required name="model" id="model" className="form-select">
                <option value="">Choose a model</option>
                {models?.map(models => {
                  return (
                    <option key={models.name} value={models.name}>{models.name}</option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AutomobileForm;
