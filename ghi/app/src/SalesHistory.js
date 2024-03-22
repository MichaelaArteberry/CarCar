import React, { useState, useEffect } from "react";

function SalesHistory() {
  const [salespeople, setSalespeople] = useState([]);
  const [sales, setSales] = useState([]);
  const [salesperson, setSalesperson] = useState([]);

  const HandleSalesPersonChange = (event) => {
    const value = event.target.value;
    setSalesperson(parseInt(value));
  };

  useEffect(() => {
    const fetchSalespeople = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/salespeople/");
        if (response.ok) {
          const data = await response.json();
          setSalespeople(data.salesperson);
        }
      } catch (error) {
        console.log("error catching salespeople");
      }
    };
    const fetchSales = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/sales/");
        if (response.ok) {
          const data = await response.json();
          setSales(data.sale);
        }
      } catch (error) {
        console.log("error catching sales");
      }
    };
    fetchSales();
    fetchSalespeople();
  }, []);
  return (
    <div className="container mt-4">
      <h2>Sales History</h2>
      <select onChange={HandleSalesPersonChange} className="form-select">
        <option value="">Choose a Salesperson</option>
        {salespeople?.map((salesperson) => (
          <option key={salesperson.id} value={salesperson.id}>
            {salesperson.first_name} {salesperson.last_name}
          </option>
        ))}
      </select>
      <table className="table">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales
            .filter((sale) => sale.salesperson.id === salesperson)
            .map((sale) => (
              <tr key={sale.id}>
                <td>
                  {sale.salesperson.first_name} {sale.salesperson.last_name}
                </td>
                <td>
                  {sale.customer.first_name} {sale.customer.last_name}
                </td>
                <td>{sale.automobile.vin}</td>
                <td>{sale.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesHistory;
