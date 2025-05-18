import ButtonSystem from "../system/ButtonSystem"
import { MdOutlineSchedule } from "react-icons/md";
import ServiceBoxSystem from "../system/ServiceBoxSystem";
import ServiceTabSystem from "../system/ServiceTabSystem";
import servicesDataDefault from "../system/servicesDataDefault";
import { useState } from "react";


function ServicesContent() {

    const [services, setServices] = useState(servicesDataDefault);

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center">
            <div className="flex justify-center w-4/5 h-4/5 mt-20 gap-6 flex-col">
            
                <ServiceTabSystem services={services} setServices={setServices} />
                <ServiceBoxSystem services={services} setServices={setServices}/>
            
                <div className="flex justify-center">  
                    <ButtonSystem
                        variant="blue"
                        text="Agendar Serviços"
                        logo={<MdOutlineSchedule/>}
                    />
                </div>

            </div>
        </div>
    )
}

export default ServicesContent