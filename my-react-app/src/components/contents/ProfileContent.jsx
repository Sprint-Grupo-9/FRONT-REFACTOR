import { useEffect, useRef, useState } from "react";
import TextBoxSystem from "../system/TextBoxSystem"
import ButtonSystem from "../system/ButtonSystem";
import { MdModeEdit } from "react-icons/md";
import { CgClose, CgNametag } from "react-icons/cg";
import { IoIosSave } from "react-icons/io";
import { putUserData, getOwnerInformation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ErrorBox from "../system/ErrorBox";

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
    const [errorMessage, setErrorMessage] = useState("")

    const [editable, setEditable] = useState(false)
    const [userData, setUserData] = useState({
        nome: name,
        cpf: cpf,
        email: email,
        telefone: telefone,
        cep: cep,
        numero: numero,
        complemento: complemento,
        logradouro: logradouro,
        bairro: bairro
    });
    const originalData = useRef(userData)
    const navigate = useNavigate()
    const { logout } = useAuth()

    useEffect(() => {
        const id = localStorage.getItem("id");
        if (id) {
            getOwnerInformation(id)
                .then(res => {
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
                    originalData.current = {
                        nome: res.data.name || "",
                        cpf: res.data.cpf || "",
                        email: res.data.email || "",
                        telefone: res.data.phoneNumber || "",
                        cep: res.data.cep || "",
                        numero: res.data.number || "",
                        complemento: res.data.complement || "",
                        logradouro: res.data.street || "",
                        bairro: res.data.neighborhood || ""
                    };
                })
                .catch(err => {
                    console.error(`Erro ao buscar dados do usuário (ID: ${id}):`, err);
                    setErrorMessage("Erro ao carregar dados do usuário");
                });
        }
    }, []);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [errorMessage]);

    const handleCepChange = async (e) => {
        const cepValue = e.target.value.replace(/\D/g, '');
        if (cepValue.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setUserData(prev => ({
                        ...prev,
                        cep: cepValue,
                        logradouro: data.logradouro,
                        bairro: data.bairro
                    }));
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
                setErrorMessage("Erro ao buscar CEP");
            }
        } else {
            setUserData(prev => ({
                ...prev,
                cep: cepValue
            }));
        }
    };

    const saveData = async () => {
        const json = {
            phoneNumber: userData.telefone.replace(/\D/g, ''),
            email: userData.email,
            cep: userData.cep,
            neighborhood: userData.bairro,
            street: userData.logradouro,
            number: userData.numero,
            complement: userData.complemento
        }

        const originalEmail = originalData.current.email;

        try {
            await putUserData(localStorage.getItem("id"), json);
            console.log("Dados salvos:", userData);

            if (userData.email !== originalEmail) {
                setErrorMessage("Email alterado. Você será desconectado.");
                setTimeout(() => {
                    logout();
                    navigate("/");
                }, 2000);
                return;
            }

            setEditable(false);
        } catch (err) {
            console.error("Erro ao salvar dados:", err);
            setErrorMessage("Erro ao salvar os dados. Tente novamente.");
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
        if (id === 'cep') {
            handleCepChange(e);
        } else {
            setUserData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center flex-col gap-8">
            {errorMessage && (
                <ErrorBox text={errorMessage}/>
            )}
            
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
                    disabled={!editable} 
                />
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
                        disabled={!editable} 
                    />

                    <TextBoxSystem
                        id="numero"
                        title="Número"
                        width="w-28"
                        onChange={handleChange}
                        value={userData.numero}
                        disabled={!editable} 
                    />
                </div>
                <TextBoxSystem
                    id="complemento"
                    title="Complemento"
                    onChange={handleChange}
                    value={userData.complemento}
                    disabled={!editable} 
                />
            </div>

            <div className="flex flex-row gap-20 w-4/5 justify-center">
                <TextBoxSystem
                    id="logradouro"
                    title="Logradouro"
                    onChange={handleChange}
                    value={userData.logradouro}
                    disabled={!editable} 
                />

                <TextBoxSystem
                    id="bairro"
                    title="Bairro"
                    onChange={handleChange}
                    value={userData.bairro}
                    disabled={!editable} 
                />
            </div>
        </div>
    )
}

export default ProfileContent