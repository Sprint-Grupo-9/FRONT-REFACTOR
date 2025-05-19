import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Site from './pages/Site';
import SystemProfile from './pages/SystemProfile';
import SystemAppointments from './pages/SystemAppointments';
import SystemPets from './pages/SystemPets';
import SystemServices from './pages/SystemServices';
import SystemDashboard from './pages/SystemDashboard';
import SystemCalendar from './pages/SystemCalendar';
import SystemPetProfile from './pages/SystemPetProfile';

function App() {
  
  return (
    <BrowserRouter>
    <div className='font-figtree'>
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/system-profile" element={<SystemProfile />} />
        <Route path="/system-services" element={<SystemServices />} />
        <Route path="/system-calendar" element={<SystemCalendar />} />
        <Route path="/system-appointments" element={<SystemAppointments />} />
        <Route path="/system-pets" element={<SystemPets />} />
        <Route path="/system-pet-profile" element={<SystemPetProfile />} />
        <Route path="/system-dashboard" element={<SystemDashboard />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;