import ButtonSystem from "../system/ButtonSystem";
import PetCardSystem from "../system/PetCardSystem"
import { MdModeEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function PetsContent() {

    const navigate = useNavigate();

    const goToPetProfile = () => navigate("/system-pet-profile");

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center">
            <div className="flex justify-start w-11/12 h-4/5 mt-20 gap-6 flex-col relative">
                <PetCardSystem 
                title="Mike" 
                subtitle="Cachorro"
                variant="blue" 
                logo={<MdModeEdit/>}
                clickButton={goToPetProfile}
                />

                <ButtonSystem 
                variant="blue" 
                text="Adicionar Novo Pet" 
                logo={<FaPlus/>} 
                />

                
            </div>
        </div>
    )
}

export default PetsContent