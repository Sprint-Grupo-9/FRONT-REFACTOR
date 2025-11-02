import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protects nested routes. Usage:
// <Route element={<RequireAuth/>}>
//   <Route path="/protected" element={<ProtectedPage/>} />
// </Route>
export function RequireAuth() {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return <Outlet />;
}

// Protects routes that require admin privileges
export function RequireAdmin() {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    const isAdmin = localStorage.getItem("admin") === "true";

    if (!isAdmin) {
        return <Navigate to="/system-appointments" replace />;
    }

    return <Outlet />;
}

export default RequireAuth;

