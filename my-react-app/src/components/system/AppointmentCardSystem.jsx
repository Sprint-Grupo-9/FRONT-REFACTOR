import { FiChevronDown } from "react-icons/fi";
import ButtonSystem from "./ButtonSystem";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { FaTaxi } from "react-icons/fa";

function AppointmentCardSystem(props) {

    const price = "Preço"
    const date = "Data"
    const time = "Horário"
    const employee = "Funcionário"

    return (
        <div className="bg-white py-4 px-4 rounded-lg shadow-sm">
            <div className="flex flex-row items-center gap-6 text-[1rem] font-bold">
                {props.hasChevron && props.active ? <FiChevronDown className={`size-10 text-secondary hover:bg-slate-200 hover:rounded-full transition-all duration-200 ${props.rotate ? '-rotate-180' : ''}`} onClick={props.clickChevron} /> : ""}

                <div className="flex items-center gap-3">
                    <BsCalendar2WeekFill className="bg-[#3B82F6] rounded-full py-2 size-10 text-white" />
                    {props.taxiService && (
                        <div className="relative" title="Serviço Taxi Dog incluído">
                            <FaTaxi className="text-yellow-500 text-xl" />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="truncate">{props.title}</div>
                    <div className="text-[0.8rem] font-thin truncate">
                        {props.subtitle}
                    </div>
                </div>

                <div className="text-[0.8rem] font-bold whitespace-nowrap">
                    <div className="text-[1rem] font-bold text-[#3B82F6]">
                        {props.price}
                    </div>
                    <div className="text-[0.8rem] font-thin">
                        {price}
                    </div>
                </div>

                <div className="h-10 w-[1px] bg-slate-300"></div>

                <div className="text-[0.8rem] font-bold whitespace-nowrap">
                    <div className="text-[1rem] font-bold text-[#3B82F6]">
                        {props.date}
                    </div>
                    <div className="text-[0.8rem] font-thin">
                        {date}
                    </div>
                </div>

                <div className="h-10 w-[1px] bg-slate-300"></div>

                <div className="text-[0.8rem] font-bold whitespace-nowrap">
                    <div className="text-[1rem] font-bold text-[#3B82F6]">
                        {props.time}
                    </div>
                    <div className="text-[0.8rem] font-thin">
                        {time}
                    </div>
                </div>

                <div className="h-10 w-[1px] bg-slate-300"></div>

                <div className="text-[0.8rem] font-bold whitespace-nowrap">
                    <div className="text-[1rem] font-bold text-[#3B82F6]">
                        {props.employee}
                    </div>
                    <div className="text-[0.8rem] font-thin">
                        {employee}
                    </div>
                </div>

                <div className="flex justify-end ml-auto">
                    <button
                        onClick={props.clickButton}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Remover agendamento"
                    >
                        {props.logo}
                    </button>
                </div>
            </div>

            {/* Observações */}
            {props.observations && props.observations.trim() !== '' && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-start gap-2">
                        <span className="text-[0.75rem] font-semibold text-gray-600 whitespace-nowrap">Observações:</span>
                        <p className="text-[0.75rem] font-normal text-gray-600 line-clamp-2">
                            {props.observations}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )

}

export default AppointmentCardSystem;