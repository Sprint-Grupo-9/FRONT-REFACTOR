import HeaderSystem from "../components/system/HeaderSystem";
import TextBoxSystem from "../components/system/TextBoxSystem";
import ButtonSystem from "../components/system/ButtonSystem";
import userImage from "../assets/user-image.svg";
import { useState } from "react";
import { MdPerson, MdHome, MdLock, MdCheckCircle, MdEmail, MdPhone, MdLocationOn, MdNumbers, MdApartment, MdBadge } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api, { registerOwner, loginOwner } from '../services/api';

const steps = [
    { icon: <MdPerson />, label: "Pessoal" },
    { icon: <MdHome />, label: "Local" },
    { icon: <MdLock />, label: "Senha" },
    { icon: <MdCheckCircle />, label: "Concluído" },
];

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0, rest;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}
function validatePhone(phone) {
    return /^\(\d{2}\) \d{5}-\d{4}$/.test(phone);
}
function validateCEP(cep) {
    return /^\d{5}-\d{3}$/.test(cep);
}
function validatePassword(s) {
    return s.length >= 6;
}

export function Cadastro() {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        cep: "",
        numero: "",
        complemento: "",
        logradouro: "",
        bairro: "",
        senha: "",
        confirmarSenha: "",
    });
    const [errors, setErrors] = useState({});
    const [loadingCep, setLoadingCep] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = async (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
        // Busca CEP automático
        if (id === "cep" && validateCEP(value)) {
            setLoadingCep(true);
            try {
                const res = await api.get(`https://viacep.com.br/ws/${value.replace(/\D/g, "")}/json/`);
                if (!res.data.erro) {
                    setForm((prev) => ({
                        ...prev,
                        logradouro: res.data.logradouro || "",
                        bairro: res.data.bairro || "",
                    }));
                }
            } catch {
                setErrors((prev) => ({ ...prev, cep: "CEP não encontrado" }));
            } finally {
                setLoadingCep(false);
            }
        }
    };

    const validateStep = () => {
        let newErrors = {};
        if (step === 0) {
            if (!form.nome) newErrors.nome = "Nome obrigatório";
            if (!form.email || !validateEmail(form.email)) newErrors.email = "E-mail inválido";
            if (!form.cpf || !validateCPF(form.cpf)) newErrors.cpf = "CPF inválido";
            if (!form.telefone || !validatePhone(form.telefone)) newErrors.telefone = "Telefone inválido";
        }
        if (step === 1) {
            if (!form.cep || !validateCEP(form.cep)) newErrors.cep = "CEP inválido";
            if (!form.numero) newErrors.numero = "Número obrigatório";
            if (!form.logradouro) newErrors.logradouro = "Logradouro obrigatório";
            if (!form.bairro) newErrors.bairro = "Bairro obrigatório";
        }
        if (step === 2) {
            if (!form.senha || !validatePassword(form.senha)) newErrors.senha = "Mínimo 6 caracteres";
            if (form.senha !== form.confirmarSenha) newErrors.confirmarSenha = "Senhas não coincidem";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep()) {
            setStep((s) => Math.min(s + 1, 3));
        } else {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };
    const prevStep = () => setStep((s) => Math.max(s - 1, 0));

    const handleRegister = async (formData) => {
        try {
            await registerOwner(formData);
            setStep(3); // Avança para o passo de sucesso
        } catch (error) {
            alert('Erro ao cadastrar: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleLogin = async (loginData) => {
        try {
            const data = await loginOwner(loginData);
            alert('Login realizado com sucesso!');
            // Redirecione ou faça o que quiser
        } catch (error) {
            alert('Erro ao fazer login: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F4F4] flex flex-col">
            {/* Alerta pop-up */}
            {showAlert && (
                <div className="fixed left-1/2 -translate-x-1/2 top-28 bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg z-50 text-sm animate-fade-in-down">
                    Preencha todos os campos obrigatórios corretamente para avançar.
                </div>
            )}
            <HeaderSystem text="Cadastro - Usuário" />
            <div className="flex flex-1 pt-20">
                <div className="flex-1 flex flex-col items-center justify-center">
                    {/* Stepper */}
                    <div className="flex items-center gap-8 mb-10">
                        {steps.map((s, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className={`rounded-full w-12 h-12 flex items-center justify-center text-2xl border-4 ${step === i ? 'border-primary bg-white text-primary' : step > i ? 'border-secondary bg-secondary text-white' : 'border-gray-300 bg-gray-200 text-gray-400'}`}>{s.icon}</div>
                                <span className={`mt-2 text-sm ${step === i ? 'text-primary' : 'text-gray-400'}`}>{s.label}</span>
                                {i < steps.length - 1 && <div className={`w-16 h-1 ${step > i ? 'bg-secondary' : 'bg-gray-300'} mt-6`}></div>}
                            </div>
                        ))}
                    </div>

                    {/* Formulário por etapa */}
                    {step === 0 && (
                        <div className="flex gap-8 w-[800px] mb-8">
                            <div className="flex flex-col gap-6 w-1/2">
                                <TextBoxSystem id="nome" title="Nome" hint="Seu nome" value={form.nome} onChange={handleChange} error={errors.nome} icon={<MdPerson />} />
                                <TextBoxSystem id="cpf" title="CPF" hint="000.000.000-00" value={form.cpf} onChange={handleChange} mask="000.000.000-00" error={errors.cpf} icon={<MdBadge />} />
                            </div>
                            <div className="flex flex-col gap-6 w-1/2">
                                <TextBoxSystem id="email" title="Email" hint="seu@email.com" value={form.email} onChange={handleChange} error={errors.email} icon={<MdEmail />} />
                                <TextBoxSystem id="telefone" title="Telefone" hint="(00) 00000-0000" value={form.telefone} onChange={handleChange} mask="(00) 00000-0000" error={errors.telefone} icon={<MdPhone />} />
                            </div>
                        </div>
                    )}
                    {step === 1 && (
                        <div className="flex gap-8 w-[800px] mb-8">
                            <div className="flex flex-col gap-6 w-1/2">
                                <TextBoxSystem id="cep" title="CEP" hint="00000-000" value={form.cep} onChange={handleChange} mask="00000-000" error={errors.cep} loading={loadingCep} icon={<MdLocationOn />} />
                                <TextBoxSystem id="logradouro" title="Logradouro" hint="Rua Exemplo" value={form.logradouro} onChange={handleChange} error={errors.logradouro} icon={<MdHome />} />
                            </div>
                            <div className="flex flex-col gap-6 w-1/2">
                                <TextBoxSystem id="numero" title="Número" hint="123" value={form.numero} onChange={handleChange} error={errors.numero} icon={<MdNumbers />} />
                                <TextBoxSystem id="bairro" title="Bairro" hint="Centro" value={form.bairro} onChange={handleChange} error={errors.bairro} icon={<MdHome />} />
                                <TextBoxSystem id="complemento" title="Complemento" hint="Apto, bloco..." value={form.complemento} onChange={handleChange} icon={<MdApartment />} />
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="flex flex-col gap-2 w-[800px] mb-8">
                            <div className="flex gap-8">
                                <div className="flex flex-col gap-6 w-1/2">
                                    <TextBoxSystem id="senha" title="Senha" hint="********" value={form.senha} onChange={handleChange} type={showPassword ? "text" : "password"} error={errors.senha} icon={<MdLock />} />
                                </div>
                                <div className="flex flex-col gap-6 w-1/2">
                                    <TextBoxSystem id="confirmarSenha" title="Confirmar Senha" hint="********" value={form.confirmarSenha} onChange={handleChange} type={showPassword ? "text" : "password"} error={errors.confirmarSenha} icon={<MdLock />} />
                                </div>
                            </div>
                            <div className="flex items-center mt-2 ml-2">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={() => setShowPassword((prev) => !prev)}
                                    className="mr-2 accent-primary"
                                />
                                <label htmlFor="showPassword" className="text-sm text-gray-600 select-none cursor-pointer">Mostrar senha</label>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="flex flex-col items-center justify-center w-[800px] mb-8">
                            <div className="text-3xl text-primary font-bold mb-4 flex items-center gap-2"><MdCheckCircle className="text-secondary" /> Cadastro concluído!</div>
                            <ButtonSystem variant="blue" text="Ir para Login" click={() => navigate('/')} />
                        </div>
                    )}

                    {/* Botões */}
                    {step < 3 && (
                        <div className="flex gap-8 w-[800px] items-center mt-2">
                            <div className="flex flex-col gap-2 w-1/2">
                                <span className="text-xs text-gray-400">Já possui conta?</span>
                                <ButtonSystem variant="white" text="Ir para Login" click={() => navigate('/')} />
                            </div>
                            <div className="flex w-1/2 justify-end gap-4">
                                {step > 0 && <ButtonSystem variant="redTransp" text="Voltar" click={prevStep} />}
                                <ButtonSystem
                                    variant="blue"
                                    text={step === 2 ? "Finalizar" : "Próximo"}
                                    click={() => {
                                        if (step === 2) {
                                            // Mapeie os campos do form para o formato esperado pela API
                                            handleRegister({
                                                name: form.nome,
                                                cpf: form.cpf.replace(/\D/g, ''),
                                                phoneNumber: form.telefone.replace(/\D/g, ''),
                                                email: form.email,
                                                password: form.senha,
                                                cep: form.cep.replace(/\D/g, ''),
                                                neighborhood: form.bairro,
                                                street: form.logradouro,
                                                number: form.numero,
                                                complement: form.complemento,
                                            });
                                        } else {
                                            nextStep();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
                {/* Imagem lateral */}
                <div className="hidden md:flex items-end justify-end w-1/2">
                    <img src={userImage} alt="Pessoa com cachorro" className="rounded-l-3xl w-[350px] h-[350px] object-cover" />
                </div>
            </div>
        </div>
    );
}