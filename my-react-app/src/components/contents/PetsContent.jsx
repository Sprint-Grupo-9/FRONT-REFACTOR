import ButtonSystem from "../system/ButtonSystem";
import PetCardSystem from "../system/PetCardSystem"
import { MdModeEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function PetsContent({ pets }) {
    const navigate = useNavigate();

    const goToPetProfile = (petId) => {
        navigate(`/system-pet-profile/${petId}`);
    };

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center">
            <div className="flex justify-start w-11/12 h-4/5 mt-20 gap-6 flex-col relative">
                {pets && pets.map(pet => (
                    <PetCardSystem
                        key={pet.id}
                        title={pet.name}
                        subtitle={pet.type}
                        variant="blue"
                        logo={<MdModeEdit />}
                        clickButton={() => goToPetProfile(pet.id)}
                    />
                ))}


                <ButtonSystem
                    variant="blue"
                    text="Adicionar Novo Pet"
                    logo={<FaPlus />}
                />
            </div>
        </div>
    )
}

export default PetsContent