import { FiChevronDown } from "react-icons/fi";
import ButtonSystem from "./ButtonSystem";
import { MdOutlinePets } from "react-icons/md";

function PetCardSystem(props) {

    return (
        <div className="bg-white py-4 px-4 flex flex-row items-center gap-6 text-[1rem] font-bold rounded-lg shadow-sm">
            {props.hasChevron && props.active ? <FiChevronDown className={`size-10 text-secondary hover:bg-slate-200 hover:rounded-full transition-all duration-200 ${props.rotate ? '-rotate-180' : ''}`} onClick={props.clickChevron} /> : ""}
            
            <MdOutlinePets className="bg-primary rounded-full py-2 size-10 text-white"/>
            <div>
                {props.title}
                 <div className="text-[0.8rem] font-thin">
                    {props.subtitle}
                </div>
            </div>
           
            <div className="flex-1 flex justify-end">
                <ButtonSystem variant={props.variant} text="Editar Pet" logo={props.logo} click={props.clickButton} />
            </div>
        </div>
    )

}

export default PetCardSystem;