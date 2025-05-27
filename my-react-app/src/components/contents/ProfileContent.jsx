import { useEffect, useRef, useState } from "react";
import TextBoxSystem from "../system/TextBoxSystem"
import ButtonSystem from "../system/ButtonSystem";
import { MdModeEdit } from "react-icons/md";
import { CgClose, CgNametag } from "react-icons/cg";
import { IoIosSave } from "react-icons/io";
import { saveUserProfile, loadUserProfile, clearUserProfile } from "../../utils/mockStorage";
import { putUserData, getOwnerInformation } from "../../services/api";
import { number } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ProfileContent() {

    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [cep, setCep] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [bairro, setBairro] = useState("")

    const initialData = {
        name: name,
        cpf: cpf,
        email: email,
        telefone: telefone,
        cep: cep,
        numero: numero,
        complemento: complemento,
        logradouro: logradouro,
        bairro: bairro
    };

    const [editable, setEditable] = useState(false)
    const [userData, setUserData] = useState(initialData)
    const originalData = useRef(initialData)

    const navigate = useNavigate()

    useEffect(() => {
        const id = localStorage.getItem("id");
        console.log("ID:", id);

        if (id) {
            getOwnerInformation(id)
                .then(res => {
                    console.log("Resposta da API:", res);
                    setUserData({
                    nome: res.data.name || "",
                    cpf: res.data.cpf || "",
                    email: res.data.email || "",
                    telefone: res.data.phoneNumber || "",
                    cep: res.data.cep || "",
                    numero: res.data.number || "",
                    complemento: res.data.complement || "",
                    logradouro: res.data.street || "",
                    bairro: res.data.neighborhood || ""
                });
                })
                .catch(err => {
                    console.error(`Erro ao buscar dados do usuário (ID: ${id}):`, err);
                });
        }
    }, []);


    const saveData = async () => {
        const json = {
            phoneNumber: userData.telefone,
            email: userData.email,
            cep: userData.cep,
            neighborhood: userData.bairro,
            street: userData.logradouro,
            number: userData.numero,
            complement: userData.complemento
        }

        const originalEmail = originalData.current.email;

        await putUserData(localStorage.getItem("id"), json)

        try {
            await putUserData(localStorage.getItem("id"), json);
            console.log("Dados salvos:", userData);

            if (userData.email !== originalEmail) {
                alert("Email alterado. Você será desconectado.");
                localStorage.clear();
                navigate("/");
            }

            setEditable(false);
        } catch (err) {
            console.error("Erro ao salvar dados:", err);
        }
    };

    const toggleEdit = () => {
        if (!editable) {
            originalData.current = { ...userData }
            setEditable(true);
        } else {
            setUserData(originalData.current)
            setEditable(false);
        }
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
            <div className="flex justify-center gap-6 pb-10 relative">
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
                    onChange={handleChange}
                    value={userData.nome}
                    disabled={true}
                    logo={true}
                    block={true}
                />

                <TextBoxSystem
                    id="cpf"
                    title="CPF"
                    onChange={handleChange}
                    value={userData.cpf}
                    mask="000.000.000-00"
                    disabled={true}
                    logo={true}
                    block={true}
                />
            </div>
            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <TextBoxSystem
                    id="email"
                    title="Email"
                    onChange={handleChange}
                    value={userData.email}
                    disabled={!editable}
                    
                />

                <TextBoxSystem
                    id="telefone"
                    title="Telefone"
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
                        width="w-60"
                        onChange={handleChange}
                        value={userData.cep}
                        mask="00000-000"
                        disabled={!editable} />

                    <TextBoxSystem
                        id="numero"
                        title="Número"
                        width="w-28"
                        onChange={handleChange}
                        value={userData.numero}
                        disabled={!editable} />
                </div>
                <TextBoxSystem
                    id="complemento"
                    title="Complemento"
                    onChange={handleChange}
                    value={userData.complemento}
                    disabled={!editable} />
            </div>
            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <TextBoxSystem
                    id="logradouro"
                    title="Logradouro"
                    onChange={handleChange}
                    value={userData.logradouro}
                    disabled={!editable} />

                <TextBoxSystem
                    id="bairro"
                    title="Bairro"
                    onChange={handleChange}
                    value={userData.bairro}
                    disabled={!editable} />
            </div>
        </div>
    )
}

export default ProfileContent