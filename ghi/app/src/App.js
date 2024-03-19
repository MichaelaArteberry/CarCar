import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechList from './ListTechnicians';
import AddTechnician from './AddTechnician';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/api/technicians" element={<TechList />} />
          <Route path="/api/technicians/new" element={<AddTechnician />} />'
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
