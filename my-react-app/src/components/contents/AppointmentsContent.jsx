import AppointmentCardSystem from "../system/AppointmentCardSystem"
import ButtonSystem from "../system/ButtonSystem"
import { CgClose } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";

function AppointmentsContent() {
    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center">
            <div className="flex justify-start w-11/12 h-4/5 mt-20 gap-6 flex-col relative">
                <AppointmentCardSystem 
                title="Banho + Corte de Unha" 
                subtitle="Mike"
                variant="redTransp" 
                logo={<CgClose/>}
                date="15/06/2025"
                time="14h"
                employee="Ricardo"
                price="R$ 4.00"
                clickButton={""}
                />

                <ButtonSystem 
                logo={<FaPlus/>}
                variant="blue" 
                text="Adicionar Agendamento" 
                />
            </div>
        </div>
    )
}

export default AppointmentsContent