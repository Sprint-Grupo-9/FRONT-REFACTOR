import { FiChevronDown } from "react-icons/fi";
import ButtonSystem from "./ButtonSystem";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { MdLocalTaxi } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

function AppointmentCardSystem(props) {

    const price = "Preço"
    const date = "Data"
    const time = "Horário"
    const employee = "Funcionário"
    const taxi = "Taxi Dog"
    const observations = "Observações"

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

            <div className="h-10 w-[1px] bg-slate-300 ml-2"></div>

            {/* Taxi Dog */}
            <div className="text-[0.8rem] font-bold pl-2">
                <div className="text-[1rem] font-bold text-primary flex items-center gap-2">
                    {props.taxiService ? (
                        <>
                            <MdLocalTaxi className="text-green-500" />
                            <span>Sim</span>
                        </>
                    ) : (
                        <>
                            <MdLocalTaxi className="text-gray-400" />
                            <span>Não</span>
                        </>
                    )}
                </div>
                <div className="text-[0.8rem] font-thin">
                    {taxi}
                </div>
            </div>

            <div className="h-10 w-[1px] bg-slate-300 ml-2"></div>

            {/* Observações */}
            <div className="text-[0.8rem] font-bold pl-2">
                <div className="text-[1rem] font-bold text-primary flex items-center gap-2">
                    {props.observations ? (
                        <>
                            <IoChatbubbleEllipsesOutline className="text-blue-500" />
                            <span>Sim</span>
                        </>
                    ) : (
                        <>
                            <IoChatbubbleEllipsesOutline className="text-gray-400" />
                            <span>Não</span>
                        </>
                    )}
                </div>
                <div className="text-[0.8rem] font-thin">
                    {observations}
                </div>
            </div>
           
            <div className="flex-1 flex justify-end">
                <button
                    onClick={props.clickButton}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Remover agendamento"
                >
                    {props.logo}
                </button>
            </div>
        </div>
    )
}

export default AppointmentCardSystem;