import { FiChevronDown } from "react-icons/fi";
import ButtonSystem from "./ButtonSystem";
import { FaPlus } from "react-icons/fa6";
import Logo from '../../assets/pet-logo.svg'

function PrimaryServiceSystem(props) {

    return (
        <div className="bg-white py-4 px-4 flex flex-row items-center gap-6 text-[20px] font-bold rounded-lg ">
            <FiChevronDown className="size-8 text-secondary" />
            <img src={Logo} width={40} className="bg-navy-blue py-3 px-3 rounded-full" />
            Banho
            <div className="flex-1 flex justify-end">
                <ButtonSystem variant="blue" text="Adionar Serviço" logo={<FaPlus />} />
            </div>
        </div>
    )

}

export default PrimaryServiceSystem;