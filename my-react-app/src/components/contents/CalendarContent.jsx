import { useNavigate, useLocation } from "react-router-dom";
import ButtonSystem from "../system/ButtonSystem";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../contents/Calendar.css'
import ServiceTabSystem from "../system/ServiceTabSystem";
import { useState } from "react";
import servicesDataDefault from "../../utils/servicesDataDefault";
import SelectSystem from "../system/SelectSystem";
import TextBoxSystem from "../system/TextBoxSystem";
import ConfirmationModalSystem from "../system/ConfirmationModalSystem";

function CalendarContent() {

    const navigate = useNavigate();
    const location = useLocation();

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [services, setServices] = useState(location.state?.selectedServices || []);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("Data selecionada:", date);
    };

    const formattedDate = selectedDate.toLocaleDateString('pt-BR');

    const confirmGoBack = () => {
        setShowConfirmModal(true);
    };

    const goToServices = () => {
        setShowConfirmModal(false);
        navigate("/system-services");
    }

    const handleCancelBack = () => {
        setShowConfirmModal(false);
    };

    const goToAppoitments = () => navigate("/system-appointments");

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center">
            {showConfirmModal && <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-40"></div>}
            <div className="flex justify-start w-11/12 h-4/5 gap-6 flex-col relative mt-20">
                <div className="absolute">
                    <ButtonSystem
                        variant="redTransp"
                        text="Voltar"
                        click={confirmGoBack}
                        logo={<IoChevronBackOutline />}
                    />
                </div>

                
                <div className="flex justify-center">
                    {showConfirmModal && (
                        <ConfirmationModalSystem 
                        text={"Deseja sair e perder os serviços selecionados?"} 
                        onCancel={handleCancelBack} 
                        onConfirm={goToServices}
                        />
                    )}
                    
                    <Calendar
                        className="rounded-lg shadow-lg p-1 bg-white text-black"
                        value={selectedDate}
                        minDate={new Date()}
                        onChange={handleDateChange}
                    />
                    
                    <div className="flex justify-end pl-10">
                        <TextBoxSystem
                            hint="12/10/2025"
                            width="w-32"
                            title="Data"
                            disabled={true}
                            value={formattedDate}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <ServiceTabSystem services={services} setServices={setServices} />
                </div>
                <div className="absolute gap-20 flex bottom-0">
                    <SelectSystem
                        title="Pet:" 
                        options={[
                            "Mike", 
                            "Josh", 
                            "Maria"
                        ].map(name => ({ value: name.toLowerCase(), label: name }))}
                    />
                    <SelectSystem
                        title="Horário:" 
                        options={[
                            "14h", 
                            "12h", 
                            "10h"
                        ].map(name => ({ value: name.toLowerCase(), label: name }))}
                    />
                    <SelectSystem
                        title="Funcionário:"
                        options={[
                            "André", 
                            "Helena", 
                            "Flávia"
                        ].map(name => ({ value: name.toLowerCase(), label: name }))}
                    />
                </div>

                <div className="absolute bottom-0 right-0">
                    <ButtonSystem
                        variant="blue"
                        text="Salvar Agendamento"
                        click={goToAppoitments}
                        logo={<IoIosSave />}
                    />
                </div>

            </div>


        </div>
    )
}

export default CalendarContent