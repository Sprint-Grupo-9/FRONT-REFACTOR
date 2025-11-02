import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Carrega usuário do localStorage ao iniciar e valida expiração básica do JWT
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");
        const id = localStorage.getItem("id");
        const admin = localStorage.getItem("admin") === "true";

        if (token && name) {
            const isExpired = isJwtExpired(token);
            if (isExpired) {
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                localStorage.removeItem("id");
                localStorage.removeItem("admin");
                setUser(null);
            } else {
                setUser({ name, token, id, admin });
            }
        }
    }, []);

    function login({ name, token, id, admin }) {
        if (token) localStorage.setItem("token", token);
        if (name) localStorage.setItem("name", name);
        if (id) localStorage.setItem("id", id);
        localStorage.setItem("admin", admin ? "true" : "false");
        setUser({ name, token, id, admin });
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        localStorage.removeItem("admin");
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

// Decodifica o payload do JWT e valida expiração (exp em segundos)
function isJwtExpired(token) {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return false; // token não-JWT, não força logout
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const payload = JSON.parse(jsonPayload);
        if (!payload.exp) return false;
        const nowInSeconds = Math.floor(Date.now() / 1000);
        return payload.exp < nowInSeconds;
    } catch {
        return false;
    }
}