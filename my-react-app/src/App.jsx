import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Site from './pages/Site';
import SystemProfile from './pages/SystemProfile';
import SystemAppointments from './pages/SystemAppointments';
import SystemPets from './pages/SystemPets';
import SystemServices from './pages/SystemServices';
import SystemDashboard from './pages/SystemDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/system-profile" element={<SystemProfile />} />
        <Route path="/system-services" element={<SystemServices />} />
        <Route path="/system-appointments" element={<SystemAppointments />} />
        <Route path="/system-pets" element={<SystemPets />} />
        <Route path="/system-dashboard" element={<SystemDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;