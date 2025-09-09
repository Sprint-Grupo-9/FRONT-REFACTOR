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

export default RequireAuth;

