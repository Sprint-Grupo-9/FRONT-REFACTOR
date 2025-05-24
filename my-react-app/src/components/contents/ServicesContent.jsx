import ButtonSystem from "../system/ButtonSystem"
import { MdOutlineSchedule } from "react-icons/md";
import ServiceBoxSystem from "../system/ServiceBoxSystem";
import ServiceTabSystem from "../system/ServiceTabSystem";
import servicesDataDefault from "../system/servicesDataDefault";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function ServicesContent() {

    const navigate = useNavigate();

    const goToCalendar = () => navigate("/system-calendar");

    const [services, setServices] = useState(servicesDataDefault);

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center">
            <div className="flex justify-center w-11/12 h-4/5 mt-20 gap-6 flex-col relative">
            
                <ServiceTabSystem services={services} setServices={setServices} />
                <ServiceBoxSystem services={services} setServices={setServices}/>
            
                <div className="flex justify-center absolute bottom-0 right-0">  
                    <ButtonSystem
                        variant="blue"
                        text="Agendar Serviços"
                        logo={<MdOutlineSchedule/>}
                        click={goToCalendar}
                    />
                </div>

            </div>
        </div>
    )
}

export default ServicesContent