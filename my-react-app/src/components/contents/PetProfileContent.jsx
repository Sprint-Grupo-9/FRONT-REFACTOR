import { useRef, useState, useEffect } from "react";
import TextBoxSystem from "../system/TextBoxSystem"
import ButtonSystem from "../system/ButtonSystem";
import { MdModeEdit, MdWarning } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { IoIosSave } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getPetDetails, updatePet, deletePet } from "../../services/api";
import ErrorBox from "../system/ErrorBox";
import SelectSystem from "../system/SelectSystem";
import { MdPets, MdScale, MdWbSunny, MdMale, MdFemale } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { BREEDS } from "../../utils/constants";

function PetProfileContent({ petId }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [editable, setEditable] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        size: '',
        species: '',
        breed: '',
        coat: '',
        age: '',
        sex: '',
    });
    const originalData = useRef(userData);
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

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await getPetDetails(petId);
                if (response && response.data) {
                    const petData = {
                        name: response.data.name || '',
                        size: response.data.size || '',
                        species: response.data.species || '',
                        breed: response.data.breed || '',
                        coat: response.data.coat || '',
                        age: response.data.age?.toString() || '',
                        sex: response.data.sex || '',
                    };
                    setUserData(petData);
                    originalData.current = petData;
                } else {
                    navigate("/system-pets");
                }
            } catch (err) {
                console.error('Erro ao buscar dados do pet:', err);
                setErrorMessage("Erro ao carregar os dados do pet");
                navigate("/system-pets");
            }
        };

        fetchPetData();
    }, [petId, navigate]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (userData.species) {
            setBreedOptions(BREEDS[userData.species] || []);
        }
    }, [userData.species]);

    const goToPets = () => navigate("/system-pets");

    const toggleEdit = () => {
        if (!editable) {
            originalData.current = { ...userData };
            setEditable(true);
        } else {
            setUserData(originalData.current);
            setEditable(false);
        }
    };

    const saveData = async () => {
        try {
            const petData = {
                name: userData.name,
                size: userData.size,
                species: userData.species,
                breed: userData.breed,
                coat: userData.coat,
                age: parseInt(userData.age) || 0,
                sex: userData.sex
            };

            await updatePet(petId, petData);
            setErrorMessage("Dados atualizados com sucesso!");
            setEditable(false);
        } catch (err) {
            console.error('Erro ao atualizar pet:', err);
            setErrorMessage("Erro ao atualizar os dados do pet");
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deletePet(petId);
            setErrorMessage("Pet excluído com sucesso!");
            setTimeout(() => {
                navigate("/system-pets");
            }, 1000);
        } catch (err) {
            console.error('Erro ao excluir pet:', err);
            setErrorMessage("Erro ao excluir o pet");
        } finally {
            setShowDeleteModal(false);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSelectChange = (field, option) => {
        setUserData(prev => ({
            ...prev,
            [field]: option.value
        }));
    };

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center flex-col gap-8">
            {errorMessage && <ErrorBox text={errorMessage} />}

            <div className="flex justify-center gap-6 pb-10">
                <ButtonSystem
                    variant="redTransp"
                    text="Voltar"
                    click={goToPets}
                    logo={<IoChevronBackOutline />}
                />
                {editable && (
                    <ButtonSystem
                        variant="blue"
                        text="Salvar Dados"
                        logo={<IoIosSave />}
                        click={saveData}
                    />
                )}
                <ButtonSystem
                    variant={editable ? "redTransp" : "blue"}
                    text={editable ? "Cancelar" : "Editar Dados"}
                    logo={editable ? <CgClose /> : <MdModeEdit />}
                    click={toggleEdit}
                />
                {!editable && (
                    <ButtonSystem
                        variant="red"
                        text="Excluir Pet"
                        logo={<FaTrash />}
                        click={handleDeleteClick}
                    />
                )}
            </div>

            <div className="grid grid-cols-2 gap-x-20 gap-y-6 w-11/12 max-w-5xl">
                <TextBoxSystem
                    id="name"
                    title="Nome"
                    hint="Fred"
                    onChange={handleChange}
                    value={userData.name}
                    disabled={!editable}
                />

                <SelectSystem
                    id="species"
                    title="Espécie"
                    options={speciesOptions}
                    onChange={(option) => {
                        handleSelectChange('species', option);
                        setUserData(prev => ({
                            ...prev,
                            breed: '' // Reset breed when species changes
                        }));
                    }}
                    value={userData.species}
                    disabled={!editable}
                    icon={<MdPets />}
                />

                <SelectSystem
                    id="size"
                    title="Porte"
                    options={sizeOptions}
                    onChange={(option) => handleSelectChange('size', option)}
                    value={userData.size}
                    disabled={!editable}
                    icon={<MdScale />}
                />

                <SelectSystem
                    id="breed"
                    title="Raça"
                    options={breedOptions}
                    onChange={(option) => handleSelectChange('breed', option)}
                    value={userData.breed}
                    disabled={!editable || !userData.species}
                    icon={<MdPets />}
                />

                <SelectSystem
                    id="coat"
                    title="Pelagem"
                    options={coatOptions}
                    onChange={(option) => handleSelectChange('coat', option)}
                    value={userData.coat}
                    disabled={!editable}
                    icon={<MdWbSunny />}
                />

                <TextBoxSystem
                    id="age"
                    title="Idade"
                    hint="10"
                    onChange={handleChange}
                    value={userData.age}
                    disabled={!editable}
                />

                <SelectSystem
                    id="sex"
                    title="Sexo"
                    options={sexOptions}
                    onChange={(option) => handleSelectChange('sex', option)}
                    value={userData.sex}
                    disabled={!editable}
                    icon={userData.sex === 'macho' ? <MdMale /> : <MdFemale />}
                />
            </div>

            {/* Modal de Confirmação */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center gap-3 mb-4">
                            <MdWarning className="text-yellow-500 text-3xl" />
                            <h3 className="text-xl font-semibold text-gray-800">Confirmar Exclusão</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Tem certeza que deseja excluir o pet {userData.name}? Esta ação não poderá ser desfeita.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleDeleteCancel}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-2"
                            >
                                <FaTrash />
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PetProfileContent;