import React, { useEffect, useState } from 'react';


function AutomobileForm() {
    const [models, setModels] = useState([])


    const [model, setModel] = useState('');
    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    };


    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    };


    const [year, setYear] = useState('');
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    };


    const [vin, setVIN] = useState('');
    const handleVINChange = (event) => {
        const value = event.target.value;
        setVIN(value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.model_id = model;
        data.color = color;
        data.year = year;
        data.vin = vin;

        console.log(data);
        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(automobileUrl, fetchConfig)
        if (response.ok) {
            const newAutomobileModel = await response.json();

            setModel('');
            setColor('');
            setYear('');
            setVIN('');
        }
    }

    const fetchData = async () => {

        const vehicleModelUrl = 'http://localhost:8100/api/models/';

        const vehicleModelResponse = await fetch(vehicleModelUrl);

        if (vehicleModelResponse.ok) {
            const vehicleModelData = await vehicleModelResponse.json();
            setModels(vehicleModelData.models)
    }
}

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-3">
                    <h1>Add Automobile to Inventory!</h1>
                    <form onSubmit={handleSubmit} id="create-sales-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} required type="text" name="color" id="color" className="form-control" value={color} />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleYearChange} required type="number" name="year" id="year" className="form-control" value={year} />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleVINChange} required type="text" name="vin" id="vin" className="form-control" value={vin} />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleModelChange} required name="automobile" id="automobile" className="form-select" value={model}>
                            <option>Choose a model</option>
                            {models.map(model => {
                                return (
                                    <option key={model.id} value={model.id}>
                                        {model.name}
                                    </option>
                                )
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default AutomobileForm;
