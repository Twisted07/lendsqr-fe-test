import { Navigate, Outlet } from 'react-router-dom';

const AUTH_KEY = 'isAuthenticated';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem(AUTH_KEY) === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
