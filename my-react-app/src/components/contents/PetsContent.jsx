import ButtonSystem from "../system/ButtonSystem";
import PetCardSystem from "../system/PetCardSystem"
import { MdModeEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPet } from "../../services/api";
import ErrorBox from "../system/ErrorBox";
import TextBoxSystem from "../system/TextBoxSystem";
import SelectSystem from "../system/SelectSystem";
import { MdPets, MdScale, MdWbSunny, MdMale, MdFemale } from "react-icons/md";
import { BREEDS } from "../../utils/constants";

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

    const [breedOptions, setBreedOptions] = useState([]);

    const sizeOptions = [
        { value: "pp", label: "PP (0 a 2,9kg)" },
        { value: "p", label: "P (3 a 7,9kg)" },
        { value: "m", label: "M (8 a 19,9kg)" },
        { value: "g", label: "G (20 a 29,9kg)" },
        { value: "gg", label: "GG (30 a 60kg)" }
    ];

    const coatOptions = [
        { value: "curta", label: "Curta" },
        { value: "longa", label: "Longa" }
    ];

    const sexOptions = [
        { value: "macho", label: "Macho" },
        { value: "femea", label: "Fêmea" }
    ];

    const speciesOptions = [
        { value: "cao", label: "Cão" },
        { value: "gato", label: "Gato" },
        { value: "porquinho", label: "Porquinho-da-índia" },
        { value: "coelho", label: "Coelho" },
        { value: "furao", label: "Furão" }
    ];

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

    const handleSelectChange = (field, option) => {
        setNewPet(prev => ({
            ...prev,
            [field]: option.value
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

    useEffect(() => {
        if (newPet.species) {
            setBreedOptions(BREEDS[newPet.species] || []);
        }
    }, [newPet.species]);

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center">
            {errorMessage && <ErrorBox text={errorMessage} />}

            <div className="flex justify-start w-11/12 h-4/5 mt-20 gap-6 flex-col relative">
                {pets && pets.length > 0 ? (
                    <>
                        {pets.map(pet => (
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
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-6 text-center">
                        <MdPets className="text-primary text-6xl" />
                        <h2 className="text-2xl font-semibold text-slate-800">
                            Nenhum pet cadastrado
                        </h2>
                        <p className="text-slate-600 max-w-md">
                            Você ainda não cadastrou nenhum pet. Clique no botão abaixo para adicionar seu primeiro pet.
                        </p>
                        <ButtonSystem
                            variant="blue"
                            text="Adicionar Novo Pet"
                            logo={<FaPlus />}
                            click={() => setShowCreateModal(true)}
                        />
                    </div>
                )}
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Novo Pet</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <TextBoxSystem
                                    id="name"
                                    title="Nome"
                                    hint="Fred"
                                    onChange={handleInputChange}
                                    value={newPet.name}
                                />
                            </div>

                            <SelectSystem
                                id="species"
                                title="Espécie"
                                options={speciesOptions}
                                onChange={(option) => {
                                    handleSelectChange('species', option);
                                    setNewPet(prev => ({
                                        ...prev,
                                        breed: '' // Reset breed when species changes
                                    }));
                                }}
                                value={newPet.species}
                                icon={<MdPets />}
                            />

                            <SelectSystem
                                id="size"
                                title="Porte"
                                options={sizeOptions}
                                onChange={(option) => handleSelectChange('size', option)}
                                value={newPet.size}
                                icon={<MdScale />}
                            />

                            <SelectSystem
                                id="breed"
                                title="Raça"
                                options={breedOptions}
                                onChange={(option) => handleSelectChange('breed', option)}
                                value={newPet.breed}
                                disabled={!newPet.species}
                                icon={<MdPets />}
                            />

                            <SelectSystem
                                id="coat"
                                title="Pelagem"
                                options={coatOptions}
                                onChange={(option) => handleSelectChange('coat', option)}
                                value={newPet.coat}
                                icon={<MdWbSunny />}
                            />

                            <div className="w-1/4">
                                <TextBoxSystem
                                    id="age"
                                    title="Idade"
                                    hint="10"
                                    onChange={handleInputChange}
                                    value={newPet.age}
                                    width="w-24"
                                />
                            </div>

                            <SelectSystem
                                id="sex"
                                title="Sexo"
                                options={sexOptions}
                                onChange={(option) => handleSelectChange('sex', option)}
                                value={newPet.sex}
                                icon={newPet.sex === 'macho' ? <MdMale /> : <MdFemale />}
                            />

                            <div className="col-span-2 flex justify-end gap-4 mt-4">
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
                </div>
            )}
        </div>
    );
}

export default PetsContent;