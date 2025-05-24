import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Carrega usuário do localStorage ao iniciar
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");
        if (token && name) setUser({ name, token });
    }, []);

    function login({ name, token }) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        setUser({ name, token });
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
} 