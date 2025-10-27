import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import { LoadingProvider } from './context/LoadingContext';
import AppointmentPage from './pages/agendamentos/AppointmentPage';
import { Toaster } from 'react-hot-toast';
import LoadingSystem from './components/system/LoadingSystem';
import { RequireAuth } from './routes/Routes.jsx';
import ChatButton from './components/system/ChatButton';

function App() {
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        // Simula o carregamento inicial
        const timer = setTimeout(() => {
            setIsInitialLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isInitialLoading) {
        return <LoadingSystem />;
    }

    return (
        <BrowserRouter>
            <AuthProvider>
                <LoadingProvider>
                    <div className='font-figtree'>
                        <Toaster position="top-right" />
                        <ChatButton />
                        <Routes>
                            <Route path="/" element={<Site />} />
                            <Route path='/cadastro' element={<Cadastro />} />

                            <Route element={<RequireAuth />}>
                                <Route path="/system-profile" element={<SystemProfile />} />
                                <Route path="/system-services" element={<SystemServices />} />
                                <Route path="/system-calendar" element={<SystemCalendar />} />
                                <Route path="/system-appointments" element={<SystemAppointments />} />
                                <Route path="/system-pets" element={<SystemPets />} />
                                <Route path="/system-pet-profile/:petId" element={<SystemPetProfile />} />
                                <Route path="/system-dashboard" element={<SystemDashboard />} />
                                <Route path="/system-appointments/new" element={<AppointmentPage />} />
                            </Route>
                        </Routes>
                    </div>
                </LoadingProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;