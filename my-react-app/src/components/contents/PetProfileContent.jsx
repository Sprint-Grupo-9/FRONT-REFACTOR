import { useRef, useState, useEffect } from "react";
import TextBoxSystem from "../system/TextBoxSystem"
import ButtonSystem from "../system/ButtonSystem";
import { MdModeEdit } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { IoIosSave } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getPetDetails, updatePet, deletePet } from "../../services/api";
import ErrorBox from "../system/ErrorBox";
import SelectSystem from "../system/SelectSystem";
import { MdPets, MdScale, MdWbSunny, MdMale, MdFemale } from "react-icons/md";

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
        { value: "passaro", label: "Pássaro" },
        { value: "peixe", label: "Peixe" },
        { value: "hamster", label: "Hamster" },
        { value: "porquinho", label: "Porquinho-da-índia" },
        { value: "coelho", label: "Coelho" },
        { value: "lagarto", label: "Lagarto" },
        { value: "tartaruga", label: "Tartaruga" },
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

    const deleteCurrentPet = async () => {
        try {
            await deletePet(petId);
            setErrorMessage("Pet excluído com sucesso!");
            setTimeout(() => {
                navigate("/system-pets");
            }, 1000);

        } catch (err) {
            console.error('Erro ao excluir pet:', err);
            setErrorMessage("Erro ao excluir o pet");
        }
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
                        click={deleteCurrentPet}
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
                    onChange={(option) => handleSelectChange('species', option)}
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

                <TextBoxSystem
                    id="breed"
                    title="Raça"
                    hint="Maltês"
                    onChange={handleChange}
                    value={userData.breed}
                    disabled={!editable}
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
        </div>
    );
}

export default PetProfileContent;