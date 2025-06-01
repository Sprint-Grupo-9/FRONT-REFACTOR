import { useNavigate, useLocation } from "react-router-dom";
import { MdPets, MdPerson, MdCalendarMonth, MdDashboard } from "react-icons/md";
import ButtonSystem from "./ButtonSystem";

function SlidebarSystem() {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = localStorage.getItem("name") || "Usuário";

    return (
        <div className="w-64 h-screen bg-white shadow-md pt-20">
            <div className="flex flex-col gap-2 p-4">
                {/* Perfil do Usuário */}
                <div className="flex items-center gap-3 p-4 mb-4 border-b border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MdPerson className="text-primary text-xl" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Bem-vindo(a),</p>
                        <p className="text-primary font-semibold">{userName}</p>
                    </div>
                </div>

                <ButtonSystem
                    variant="white"
                    text="Perfil"
                    click={() => navigate('/system-profile')}
                    logo={<MdPerson />}
                    className={`text-primary ${location.pathname === '/system-profile' ? 'bg-primary/10' : ''}`}
                />
                <ButtonSystem
                    variant="white"
                    text="Pets"
                    click={() => navigate('/system-pets')}
                    logo={<MdPets />}
                    className={`text-primary ${location.pathname === '/system-pets' ? 'bg-primary/10' : ''}`}
                />
                <ButtonSystem
                    variant="white"
                    text="Agendamentos"
                    click={() => navigate('/system-appointments')}
                    logo={<MdCalendarMonth />}
                    className={`text-primary ${location.pathname === '/system-appointments' ? 'bg-primary/10' : ''}`}
                />
                <ButtonSystem
                    variant="white"
                    text="Dashboard"
                    click={() => navigate('/system-dashboard')}
                    logo={<MdDashboard />}
                    className={`text-primary ${location.pathname === '/system-dashboard' ? 'bg-primary/10' : ''}`}
                />
            </div>
        </div>
    );
}

export default SlidebarSystem; 