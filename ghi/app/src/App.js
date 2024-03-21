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
          <Route path="/api/technicians" element={<TechList />} />
          <Route path="/api/technicians/new" element={<AddTechnician />} />
          <Route path="/api/appointments/new" element={<CreateAppointment />} />
          <Route path="/api/appointments" element={<ListAppointments />} />
          <Route path="/api/serviceHistory" element={<ServiceHistory />} />
          <Route path="/salespeople" element={<SalespersonList />} />
          <Route path="/salespeople/new" element={<SalespersonForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/sales" element={<SaleList />} />
          <Route path="/sales/new" element={<SaleForm />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/models" element={<ModelList />} />
          <Route path="/models/new" element={<ModelForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobiles/new" element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
