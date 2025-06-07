import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import Pataservice from "../components/shared/Pataservice";
import { loginOwner } from '../services/api';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowAlert(false);
        try {
            const data = await loginOwner({ email, password });
            login({ name: data.name, token: data.token });
            setEmail("");
            setPassword("");
            if (onClose) onClose();
        } catch (error) {
            setAlertMsg("Usuário ou senha inválidos.");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`fixed left-[30%] w-full flex justify-center z-40 transition-all duration-500 ${isOpen ? 'top-[39px] opacity-100 pointer-events-auto' : 'top-0 opacity-0 pointer-events-none'
                }`}
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative  mt-10">
                {showAlert && (
                    <div className="fixed left-1/2 -translate-x-1/2 top-28 bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg z-50 text-sm animate-fade-in-down">
                        {alertMsg}
                    </div>
                )}
                <div className="w-full pl-52">
                    <Pataservice />
                </div>
                <h2 className="text-2xl font-bold text-navy-blue mb-6 text-center font-figtree">Login</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-xl">
                            <MdEmail />
                        </span>
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="border border-gray-300 rounded pl-10 pr-4 py-2 focus:outline-none focus:border-primary font-figtree w-full"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-xl">
                            <MdLock />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            className="border border-gray-300 rounded pl-10 pr-4 py-2 focus:outline-none focus:border-primary font-figtree w-full"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center mt-2 ml-2">
                        <input
                            type="checkbox"
                            id="showPasswordLogin"
                            checked={showPassword}
                            onChange={() => setShowPassword((prev) => !prev)}
                            className="mr-2 accent-primary"
                        />
                        <label htmlFor="showPasswordLogin" className="text-sm text-gray-600 select-none cursor-pointer">Mostrar senha</label>
                    </div>
                    <div className="w-full flex justify-center">
                        <p>Esqueceu sua senha? <a href="#" className="text-primary font-bold">Clique aqui</a></p>
                    </div>
                    <button
                        type="submit"
                        className="bg-secondary text-white font-bold py-2 rounded-lg mt-2 hover:bg-primary transition-colors font-figtree"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal; 