import Logotaxi from "../shared/Logotaxi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Cardsite2() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  function handleAgendar() {
    if (!user) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      navigate("/system-profile");
    }
  }

  return (
    <div className='w-80 h-40 rounded-2xl bg-card-grey flex float-start items-center p-4'>
      <div className='w-[104px] h-[104px] rounded-md bg-white flex items-center justify-center'>
        <div className='w-[90px] h-[90px] bg-card-yellow rounded-md flex items-center justify-center'>
          <Logotaxi />
        </div>
      </div>
      <div className='w-2/3 h-full flex flex-col justify-center items-start pl-4'>
        <h1 className='text-navy-blue font-poppins text-[24px] mb-4 font-bold'>Taxi dog</h1>
        {showAlert && (
          <div className="fixed left-1/2 -translate-x-1/2 top-28 bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg z-50 text-sm animate-fade-in-down">
            Você precisa estar logado para agendar!
          </div>
        )}
        <button onClick={handleAgendar} className='bg-secondary text-white font-bold font-figtree py-2 px-6 rounded-lg transition-all duration-900 hover:bg-white hover:text-primary'>Agendar</button>
      </div>
    </div>
  )
}

export default Cardsite2;