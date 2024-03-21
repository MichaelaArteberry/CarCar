import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import SalespersonForm from './SalespersonForm';
import Nav from './Nav';
import SalespersonList from './SalespersonList';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import SaleList from './SaleList';
import SaleForm from './SaleForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import ModelList from './ModelList';
import ModelForm from './ModelForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/automobiles" element={<AutomobileList manufacturer={props.automobile} />} />
          <Route path="/automobiles/new" element={<AutomobileForm />} />
          <Route path="/manufacturers" element={<ManufacturerList manufacturer={props.manufacturer} />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/models" element={<ModelList model={props.model} />} />
          <Route path="/models/new" element={<ModelForm />} />
          <Route path="/salespeople" element={<SalespersonList salesperson={props.salesperson} />} />
          <Route path="/salespeople/new" element={<SalespersonForm />} />
          <Route path="/customers" element={<CustomerList customer={props.customer} />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/sales" element={<SaleList customer={props.sale} />} />
          <Route path="/sales/new" element={<SaleForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
