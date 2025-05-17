import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Site from './pages/Site'
import SystemProfile from './pages/SystemProfile';
import SystemAppointments from './pages/SystemAppointments';
import SystemPets from './pages/SystemPets';
import SystemServices from './pages/SystemServices';


function App() {
  
  return (
    <BrowserRouter>
    <div className='font-figtree'>
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/system-profile" element={<SystemProfile />} />
        <Route path="/system-services" element={<SystemServices />} />
        <Route path="/system-appointments" element={<SystemAppointments />} />
        <Route path="/system-pets" element={<SystemPets />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
