import { FiChevronDown } from "react-icons/fi";
import ButtonSystem from "./ButtonSystem";
import { FaPlus } from "react-icons/fa6";
import Logo from '../../assets/pet-logo.svg'
import SwitchButtonSystem from "./SwitchButtonSystem";
import SubServiceSystem from "./SubServiceSystem";
import PrimaryServiceSystem from "./PrimaryServiceSystem";

function ServiceBoxSystem(props) {

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <PrimaryServiceSystem/>

            <div className="flex flex-row gap-6 w-full">
                <SubServiceSystem title="Hidradatação" active={false}/>
                <SubServiceSystem title="Desembolo" active={true}/>
                <SubServiceSystem title="Tosa Higiênica" active={false}/>
                <SubServiceSystem title="Tosa na Máquina" active={true}/>
            </div>
            <div className="flex flex-row gap-6 w-full">
                <SubServiceSystem title="Botinha" active={false}/>
                <SubServiceSystem title="Tosa Bebê na Máquina" active={true}/>
                <SubServiceSystem title="Escovação" active={false}/>
            </div>

            <PrimaryServiceSystem/>
        </div>
    )

}

export default ServiceBoxSystem;