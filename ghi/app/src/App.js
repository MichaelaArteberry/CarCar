import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechList from './ListTechnicians';
import AddTechnician from './AddTechnician';
import CreateAppointment from './AddAppointment';
import ListAppointments from './ListAppiontments';
import ServiceHistory from './ServiceHistory';

function App() {
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
