import ButtonSystem from "../system/ButtonSystem"
import { MdOutlineSchedule } from "react-icons/md";
import ServiceBoxSystem from "../system/ServiceBoxSystem";
import ServiceTabSystem from "../system/ServiceTabSystem";
import servicesDataDefault from "../../utils/servicesDataDefault";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorBox from "../system/ErrorBox";



function ServicesContent() {

    const navigate = useNavigate();

    const [services, setServices] = useState(servicesDataDefault);
    const [errorMessage, setErrorMessage] = useState("");

    const goToCalendar = () => {
        const selectedServices = services.filter(service =>
            service.active || service.subServices.some(sub => sub.active)
        );

        if (selectedServices.length === 0) {
            setErrorMessage("Selecione pelo menos um serviço para agendar.");
        }
        else {
            setErrorMessage("");
            navigate("/system-calendar", { state: { selectedServices } });
        }

    };

    useEffect(() => {
        const hasActive = services.some(service =>
            service.active || service.subServices.some(sub => sub.active)
        );

        if (hasActive && errorMessage) {
            setErrorMessage("");
        }
    }, [services]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [errorMessage]);

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center">
            
            {errorMessage && (
                <ErrorBox text={errorMessage}/>
            )}

            <div className="flex justify-center w-11/12 h-4/5 mt-20 gap-6 flex-col relative">

                <ServiceTabSystem services={services} setServices={setServices} />
                <ServiceBoxSystem services={services} setServices={setServices} />


                <div className="flex justify-center absolute bottom-0 right-0">
                    <ButtonSystem
                        variant="blue"
                        text="Agendar Serviços"
                        logo={<MdOutlineSchedule />}
                        click={goToCalendar}
                    />
                </div>



            </div>
        </div>
    )
}

export default ServicesContent