import ButtonSystem from "../system/ButtonSystem";
import PetCardSystem from "../system/PetCardSystem"
import { MdModeEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPet } from "../../services/api";
import ErrorBox from "../system/ErrorBox";
import TextBoxSystem from "../system/TextBoxSystem";
import ConfirmationModalSystem from "../system/ConfirmationModalSystem";

function PetsContent({ pets, setPets }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newPet, setNewPet] = useState({
        name: "",
        size: "",
        species: "",
        breed: "",
        coat: "",
        age: "",
        sex: ""
    });

    const goToPetProfile = (petId) => {
        navigate(`/system-pet-profile/${petId}`);
    };

    const handleCreatePet = async () => {
        try {
            const ownerId = localStorage.getItem("id");
            const petData = {
                ...newPet,
                age: parseInt(newPet.age) || 0
            };
            const response = await createPet(ownerId, petData);
            setPets([...pets, response.data]);
            setShowCreateModal(false);
            setNewPet({
                name: "",
                size: "",
                species: "",
                breed: "",
                coat: "",
                age: "",
                sex: ""
            });
        } catch (err) {
            console.error("Erro ao criar pet:", err);
            setErrorMessage("Erro ao criar pet. Tente novamente.");
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewPet(prev => ({
            ...prev,
            [id]: value
        }));
    };

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center">
            {errorMessage && <ErrorBox text={errorMessage} />}
            
            <div className="flex justify-start w-11/12 h-4/5 mt-20 gap-6 flex-col relative">
                {pets && pets.map(pet => (
                    <PetCardSystem
                        key={pet.id}
                        title={pet.name}
                        subtitle={pet.species}
                        variant="blue"
                        logo={<MdModeEdit />}
                        clickButton={() => goToPetProfile(pet.id)}
                    />
                ))}

                <ButtonSystem
                    variant="blue"
                    text="Adicionar Novo Pet"
                    logo={<FaPlus />}
                    click={() => setShowCreateModal(true)}
                />
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-primary mb-6">Novo Pet</h2>
                        
                        <div className="space-y-4">
                            <TextBoxSystem
                                id="name"
                                title="Nome"
                                value={newPet.name}
                                onChange={handleInputChange}
                            />
                            <TextBoxSystem
                                id="species"
                                title="Espécie"
                                value={newPet.species}
                                onChange={handleInputChange}
                            />
                            <TextBoxSystem
                                id="size"
                                title="Porte"
                                value={newPet.size}
                                onChange={handleInputChange}
                            />
                            <TextBoxSystem
                                id="breed"
                                title="Raça"
                                value={newPet.breed}
                                onChange={handleInputChange}
                            />
                            <TextBoxSystem
                                id="age"
                                title="Idade"
                                value={newPet.age}
                                onChange={handleInputChange}
                            />
                            <TextBoxSystem
                                id="sex"
                                title="Sexo"
                                value={newPet.sex}
                                onChange={handleInputChange}
                            />
                            <TextBoxSystem
                                id="coat"
                                title="Pelagem"
                                value={newPet.coat}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <ButtonSystem
                                variant="redTransp"
                                text="Cancelar"
                                click={() => setShowCreateModal(false)}
                            />
                            <ButtonSystem
                                variant="blue"
                                text="Criar Pet"
                                click={handleCreatePet}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PetsContent;