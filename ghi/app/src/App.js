import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechList from './ListTechnicians';
import AddTechnician from './AddTechnician';
import CreateAppointment from './AddAppointment';
import ListAppointments from './ListAppiontments';
import ServiceHistory from './ServiceHistory';
import SalespersonList from './SalespersonList';
import SalespersonForm from './SalespersonForm';
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
          <Route path="/technicians" element={<TechList />} />
          <Route path="/technicians/add" element={<AddTechnician />} />
          <Route path="/appointments/add" element={<CreateAppointment />} />
          <Route path="/appointments" element={<ListAppointments />} />
          <Route path="/service-history" element={<ServiceHistory />} />
          <Route path="/salespersons" element={<SalespersonList />} />
          <Route path="/salespersons/add" element={<SalespersonForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/add" element={<CustomerForm />} />
          <Route path="/sales" element={<SaleList />} />
          <Route path="/sales/add" element={<SaleForm />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturers/add" element={<ManufacturerForm />} />
          <Route path="/models" element={<ModelList />} />
          <Route path="/models/add" element={<ModelForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobiles/add" element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
