import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { estaAutenticado, cargando } = useAuth();

  if (cargando) {
    return <div className="container py-5">Cargando...</div>;
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
