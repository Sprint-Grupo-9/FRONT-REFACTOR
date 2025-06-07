import { useNavigate } from "react-router-dom";
import ButtonSystem from "./ButtonSystem";
import { IoCalendarOutline } from "react-icons/io5";

function SystemServices() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 h-[calc(100vh-64px)] bg-slate-100 flex items-center justify-center">
            <div className="text-center space-y-6">
                <h1 className="text-2xl font-semibold text-slate-800">
                    Agendar Serviços
                </h1>
                <p className="text-slate-600 max-w-md mx-auto">
                    Clique no botão abaixo para agendar os serviços para seu pet.
                </p>
                <ButtonSystem
                    variant="blue"
                    text="Novo Agendamento"
                    click={() => navigate("/appointment")}
                    logo={<IoCalendarOutline />}
                />
            </div>
        </div>
    );
}

export default SystemServices; 