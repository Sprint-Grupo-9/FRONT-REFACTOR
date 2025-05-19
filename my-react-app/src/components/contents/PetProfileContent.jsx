import { useRef, useState } from "react";
import TextBoxSystem from "../system/TextBoxSystem"
import ButtonSystem from "../system/ButtonSystem";
import { MdModeEdit } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { IoIosSave } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function PetProfileContent() {

    const navigate = useNavigate();

    const goToPets = () => navigate("/system-pets");

    const initialData = {
        nome: 'Mike',
        tipo: 'Cachorro',
        porte: 'Pequeno',
        raca: 'Morkie',
        pelagem: 'Curta',
        idade: '12',
        sexo: 'Masculino',
    };

    const [editable, setEditable] = useState(false)
    const [userData, setUserData] = useState(initialData)
    const originalData = useRef(initialData)


    const toggleEdit = () => {
        if (!editable) {
            originalData.current = { ...userData }
            setEditable(true);
        } else {
            setUserData(originalData.current)
            setEditable(false);
        }
    };

    const saveData = () => {
        console.log("Dados salvos:", userData)
        setEditable(false)
    };

    const handleChange = (e) => {
        const { id, value } = e.target
        setUserData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center flex-col gap-8">
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
                    id="nome"
                    title="Nome"
                    hint="Fred"
                    onChange={handleChange}
                    value={userData.nome}
                    disabled={!editable}
                />

                <TextBoxSystem
                    id="tipo"
                    title="Tipo"
                    hint="Gato"
                    onChange={handleChange}
                    value={userData.tipo}
                    disabled={!editable}
                />
            </div>
            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <TextBoxSystem
                    id="porte"
                    title="Porte"
                    hint="Pequeno"
                    onChange={handleChange}
                    value={userData.porte}
                    disabled={!editable}
                />

                <TextBoxSystem
                    id="raca"
                    title="Raça"
                    hint="Maltês"
                    onChange={handleChange}
                    value={userData.raca}
                    disabled={!editable} />
            </div>
            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <div className="flex flex-row gap-8">
                    <TextBoxSystem
                        id="pelagem"
                        title="Pelagem"
                        hint="Curta"
                        width="w-60"
                        onChange={handleChange}
                        value={userData.pelagem}
                        disabled={!editable} />

                    <TextBoxSystem
                        id="idade"
                        title="Idade"
                        hint="10"
                        width="w-28"
                        onChange={handleChange}
                        value={userData.idade}
                        disabled={!editable} />
                </div>
                <TextBoxSystem
                    id="sexo"
                    title="Sexo"
                    hint="Masculino"
                    onChange={handleChange}
                    value={userData.sexo}
                    disabled={!editable} />
            </div>
        </div>
    )
}

export default PetProfileContent