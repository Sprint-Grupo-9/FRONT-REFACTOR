import { FiChevronDown } from "react-icons/fi";
import ButtonSystem from "./ButtonSystem";
import { BsCalendar2WeekFill } from "react-icons/bs";

function AppointmentCardSystem(props) {

    const price = "Preço"
    const date = "Data"
    const time = "Horário"
    const employee = "Funcionário"

    return (
        <div className="bg-white py-4 px-4 flex flex-row items-center gap-6 text-[1rem] font-bold rounded-lg shadow-sm">
            {props.hasChevron && props.active ? <FiChevronDown className={`size-10 text-secondary hover:bg-slate-200 hover:rounded-full transition-all duration-200 ${props.rotate ? '-rotate-180' : ''}`} onClick={props.clickChevron} /> : ""}
            
            <BsCalendar2WeekFill className="bg-primary rounded-full py-2 size-10 text-white"/>
            <div>
                {props.title}
                 <div className="text-[0.8rem] font-thin">
                    {props.subtitle}
                </div>
            </div>

            <div className="text-[0.8rem] font-bold pl-24">
                <div className="text-[1rem] font-bold text-primary">
                    {props.price}
                </div>
                <div className="text-[0.8rem] font-thin">
                    {price}
                </div>
            </div>

            <div className="h-10 w-[1px] bg-slate-300 ml-2"></div>

            <div className="text-[0.8rem] font-bold pl-2">
                <div className="text-[1rem] font-bold text-primary">
                    {props.date}
                </div>
                <div className="text-[0.8rem] font-thin">
                    {date}    
                </div>
            </div>

            <div className="h-10 w-[1px] bg-slate-300 ml-2"></div>

            <div className="text-[0.8rem] font-bold pl-2">
                <div className="text-[1rem] font-bold text-primary">
                    {props.time}
                </div>
                <div className="text-[0.8rem] font-thin">
                    {time}
                </div>
            </div>

            <div className="h-10 w-[1px] bg-slate-300 ml-2"></div>


            <div className="text-[0.8rem] font-bold pl-2">
                <div className="text-[1rem] font-bold text-primary">
                    {props.employee}
                </div>
                <div className="text-[0.8rem] font-thin">
                    {employee}
                </div>
            </div>
           
            <div className="flex-1 flex justify-end">
                <ButtonSystem variant={props.variant} text="Remover Agendamento" logo={props.logo} click={props.clickButton} />
            </div>
        </div>
    )

}

export default AppointmentCardSystem;