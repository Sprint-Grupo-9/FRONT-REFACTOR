import { CgClose } from "react-icons/cg";
import ButtonSystem from "./ButtonSystem";

function ServiceTabSystem(props) {

    return (
        <>
            <div className="w-full h-2 text-[12px] text-slate-500">
                Serviços selecionados:
            </div>


            <div className="w-full flex flex-row gap-4">

                <button className="bg-white text-primary px-6 py-1.5 rounded-lg flex flex-row items-center gap-10">
                    <CgClose className="size-4" />Banho
                </button>

                <button className="bg-white text-primary px-6 py-1.5 rounded-lg flex flex-row items-center gap-10">
                    <CgClose className="size-4" />Corte de Unha
                </button>

            </div>
        </>
    )

}

export default ServiceTabSystem;