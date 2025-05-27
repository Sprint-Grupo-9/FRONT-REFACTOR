import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Site from './pages/Site';
import SystemProfile from './pages/SystemProfile';
import SystemAppointments from './pages/SystemAppointments';
import SystemPets from './pages/SystemPets';
import SystemServices from './pages/SystemServices';
import SystemDashboard from './pages/SystemDashboard';
import SystemCalendar from './pages/SystemCalendar';
import SystemPetProfile from './pages/SystemPetProfile';
import { Cadastro } from './Auth/Cadastro';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='font-figtree'>
          <Routes>
            <Route path="/" element={<Site />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path="/system-profile" element={<SystemProfile />} />
            <Route path="/system-services" element={<SystemServices />} />
            <Route path="/system-calendar" element={<SystemCalendar />} />
            <Route path="/system-appointments" element={<SystemAppointments />} />
            <Route path="/system-pets" element={<SystemPets />} />
            <Route path="/system-pet-profile/:petId" element={<SystemPetProfile />} />
            <Route path="/system-dashboard" element={<SystemDashboard />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;