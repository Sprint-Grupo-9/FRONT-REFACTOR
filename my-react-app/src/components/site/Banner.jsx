import { useState } from "react";
import Bannerimg from "../shared/Bannerimg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Banner() {
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
        <div className="w-full h-[600px] bg-white">
            <div className="p-24 bg-banner-pattern bg-[center_14%] rounded-br-[150px] w-full h-full flex justify-start">
                <div className=" p-10 w-[400px] h-full">
                    {showAlert && (
                        <div className="fixed left-1/2 -translate-x-1/2 top-28 bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg z-50 text-sm animate-fade-in-down">
                            Você precisa estar logado para agendar!
                        </div>
                    )}
                    <span className="flex flex-col">
                        <h3 className="font-figtree text-navy-blue text-[65px] font-normal ">Tudo para</h3>
                        <h2 className="font-figtree text-primary text-[65px] font-extrabold ">Seu pet</h2>
                        <p className=" text-[20px] text-navy-blue">Proporcione um cuidado especial para seu melhor amigo.</p>
                        <button onClick={handleAgendar} className="mt-16 bg-secondary text-white font-bold font-figtree py-2 px-4 rounded-lg transition-all duration-900 hover:bg-white hover:text-primary"> Agendar Serviços</button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Banner;