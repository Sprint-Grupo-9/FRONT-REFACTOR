import { useRef, useState } from "react";
import TextBox from "../system/TextBox"
import ButtonWhite from "../system/ButtonWhite";
import ButtonBlue from "../system/ButtonBlue";
import { MdModeEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { IoIosSave } from "react-icons/io";

function ProfileContent() {

    const initialData = {
        nome: 'Matheus',
        cpf: '440.824.488-02',
        email: 'matheus@gmail.com',
        telefone: '(11) 94023-4507',
        cep: '01504-000',
        numero: '266',
        complemento: 'Ap. 51',
        logradouro: 'Rua Vergueiro',
        bairro: 'Liberdade'
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
            <div className="flex justify-center w-4/5 gap-6 pb-10">
                {editable && (
                    <ButtonWhite
                        text="Salvar Dados"
                        logo={<IoIosSave />}
                        click={saveData}
                    />
                )}
                <ButtonBlue
                    text={editable ? "Cancelar" : "Editar Dados"}
                    logo={editable ? <MdCancel /> : <MdModeEdit />}
                    click={toggleEdit}
                />
            </div>

            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <TextBox
                    id="nome"
                    title="Nome"
                    hint="Matheus"
                    onChange={handleChange}
                    value={userData.nome}
                    disabled={!editable} />

                <TextBox
                    id="cpf"
                    title="CPF"
                    hint="44082448802"
                    onChange={handleChange}
                    value={userData.cpf}
                    disabled={!editable} />
            </div>
            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <TextBox
                    id="email"
                    title="Email"
                    hint="matheus@gmail.com"
                    onChange={handleChange}
                    value={userData.email}
                    disabled={!editable} />

                <TextBox
                    id="telefone"
                    title="Telefone"
                    hint="11940234507"
                    onChange={handleChange}
                    value={userData.telefone}
                    disabled={!editable} />
            </div>
            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <div className="flex flex-row gap-10">
                    <TextBox
                        id="cep"
                        title="CEP"
                        hint="01504000"
                        width="w-50"
                        onChange={handleChange}
                        value={userData.cep}
                        disabled={!editable} />

                    <TextBox
                        id="numero"
                        title="Número"
                        hint="266"
                        width="w-20"
                        onChange={handleChange}
                        value={userData.numero}
                        disabled={!editable} />
                </div>
                <TextBox
                    id="complemento"
                    title="Complemento"
                    hint="Ap. 51"
                    onChange={handleChange}
                    value={userData.complemento}
                    disabled={!editable} />
            </div>
            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <TextBox
                    id="logradouro"
                    title="Logradouro"
                    hint="Rua Vergueiro"
                    onChange={handleChange}
                    value={userData.logradouro}
                    disabled={!editable} />

                <TextBox
                    id="bairro"
                    title="Bairro"
                    hint="Liberdade"
                    onChange={handleChange}
                    value={userData.bairro}
                    disabled={!editable} />
            </div>
        </div>
    )
}

export default ProfileContent