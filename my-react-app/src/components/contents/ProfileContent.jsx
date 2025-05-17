import { useRef, useState } from "react";
import TextBoxSystem from "../system/TextBoxSystem"
import ButtonSystem from "../system/ButtonSystem";
import { MdModeEdit } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { IoIosSave } from "react-icons/io";

function ProfileContent() {

    const initialData = {
        nome: 'Matheus',
        cpf: '44082448802',
        email: 'matheus@gmail.com',
        telefone: '11940234507',
        cep: '01504000',
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
            <div className="flex justify-center w-4/5 gap-6 pb-5">
                {editable && (
                    <ButtonSystem
                        variant="blue"
                        text="Salvar Dados"
                        logo={<IoIosSave />}
                        click={saveData}
                        
                    />
                )}
                <ButtonSystem
                    variant={editable ? "orange" : "blue"}
                    text={editable ? "Cancelar" : "Editar Dados"}
                    logo={editable ? <CgClose /> : <MdModeEdit />}
                    click={toggleEdit}
                />
            </div>

            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <TextBoxSystem
                    id="nome"
                    title="Nome"
                    hint="Daniel"
                    onChange={handleChange}
                    value={userData.nome}
                    disabled={!editable} />

                <TextBoxSystem
                    id="cpf"
                    title="CPF"
                    hint="000.000.000-00"
                    onChange={handleChange}
                    value={userData.cpf}
                    mask="000.000.000-00"
                    disabled={!editable} />
            </div>
            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <TextBoxSystem
                    id="email"
                    title="Email"
                    hint="daniel@email.com"
                    onChange={handleChange}
                    value={userData.email}
                    disabled={!editable} />

                <TextBoxSystem
                    id="telefone"
                    title="Telefone"
                    hint="(00) 00000-0000"
                    onChange={handleChange}
                    value={userData.telefone}
                    mask="(00) 00000-0000"
                    disabled={!editable} />
            </div>
            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <div className="flex flex-row gap-8">
                    <TextBoxSystem
                        id="cep"
                        title="CEP"
                        hint="00000-000"
                        width="w-60"
                        onChange={handleChange}
                        value={userData.cep}
                        mask="00000-000"
                        disabled={!editable} />

                    <TextBoxSystem
                        id="numero"
                        title="Número"
                        hint="266"
                        width="w-28"
                        onChange={handleChange}
                        value={userData.numero}
                        disabled={!editable} />
                </div>
                <TextBoxSystem
                    id="complemento"
                    title="Complemento"
                    hint="Ap. 51"
                    onChange={handleChange}
                    value={userData.complemento}
                    disabled={!editable} />
            </div>
            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <TextBoxSystem
                    id="logradouro"
                    title="Logradouro"
                    hint="Rua Vergueiro"
                    onChange={handleChange}
                    value={userData.logradouro}
                    disabled={!editable} />

                <TextBoxSystem
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