import { useNavigate } from "react-router-dom";
import ButtonSystem from "../system/ButtonSystem";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../contents/Calendar.css'
import ServiceTabSystem from "../system/ServiceTabSystem";
import { useState } from "react";
import servicesDataDefault from "../system/servicesDataDefault";
import SelectSystem from "../system/SelectSystem";

function CalendarContent() {

    const navigate = useNavigate();
    const [services, setServices] = useState(servicesDataDefault);

    const goToServices = () => navigate("/system-services");
    const goToAppoitments = () => navigate("/system-appointments");


    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center">
            <div className="flex justify-start w-11/12 h-4/5 mt-20 gap-6 flex-col relative">
                <div className="absolute">
                    <ButtonSystem
                        variant="redTransp"
                        text="Voltar"
                        click={goToServices}
                        logo={<IoChevronBackOutline />}
                    />
                </div>
                <div className="flex justify-center">
                    <Calendar
                        className="rounded-lg shadow-lg p-4 bg-white text-black"
                    /> 
                </div>
                <div className="flex flex-col">
                    <ServiceTabSystem services={services} setServices={setServices} />
                </div>
                 <div className="absolute gap-20 flex bottom-0">
                    <SelectSystem title="Pet:"/>
                    <SelectSystem title="Horário:"/>
                    <SelectSystem title="Funcionário:"/>
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