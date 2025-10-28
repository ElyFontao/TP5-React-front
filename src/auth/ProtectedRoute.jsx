import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const ProtectedRoute = ({ children, roles }) => {
  const { usuario } = useAuth();

  if (!usuario) return <Navigate to="/login" />;
  if (roles && !roles.includes(usuario.rol)) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
