import { useRef, useState, useEffect } from "react";
import TextBoxSystem from "../system/TextBoxSystem"
import ButtonSystem from "../system/ButtonSystem";
import { MdModeEdit } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { IoIosSave } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getPetById, updatePet } from "../../services/api";
import ErrorBox from "../system/ErrorBox";

function PetProfileContent({ petId }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [editable, setEditable] = useState(false);
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

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await getPetById(petId);
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
                }
            } catch (err) {
                console.error('Erro ao buscar dados do pet:', err);
                setErrorMessage("Erro ao carregar os dados do pet");
            }
        };

        fetchPetData();
    }, [petId]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center flex-col gap-8">
            {errorMessage && <ErrorBox text={errorMessage} />}
            
            <div className="flex relative w-full">
                <div className="flex pl-20">
                    <ButtonSystem
                        variant="redTransp"
                        text="Voltar"
                        click={goToPets}
                        logo={<IoChevronBackOutline />}
                    />
                </div>
            </div>
            <div className="flex gap-6 pb-10">
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
            </div>

            <div className="flex flex-row gap-20 w-11/12 justify-center">
                <TextBoxSystem
                    id="name"
                    title="Nome"
                    hint="Fred"
                    onChange={handleChange}
                    value={userData.name}
                    disabled={!editable}
                />

                <TextBoxSystem
                    id="species"
                    title="Tipo"
                    hint="Gato"
                    onChange={handleChange}
                    value={userData.species}
                    disabled={!editable}
                />
            </div>
            
            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <TextBoxSystem
                    id="size"
                    title="Porte"
                    hint="Pequeno"
                    onChange={handleChange}
                    value={userData.size}
                    disabled={!editable}
                />

                <TextBoxSystem
                    id="breed"
                    title="Raça"
                    hint="Maltês"
                    onChange={handleChange}
                    value={userData.breed}
                    disabled={!editable}
                />
            </div>
            
            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <div className="flex flex-row gap-8">
                    <TextBoxSystem
                        id="coat"
                        title="Pelagem"
                        hint="Curta"
                        width="w-60"
                        onChange={handleChange}
                        value={userData.coat}
                        disabled={!editable}
                    />

                    <TextBoxSystem
                        id="age"
                        title="Idade"
                        hint="10"
                        width="w-28"
                        onChange={handleChange}
                        value={userData.age}
                        disabled={!editable}
                    />
                </div>
                <TextBoxSystem
                    id="sex"
                    title="Sexo"
                    hint="Masculino"
                    onChange={handleChange}
                    value={userData.sex}
                    disabled={!editable}
                />
            </div>
        </div>
    );
}

export default PetProfileContent;