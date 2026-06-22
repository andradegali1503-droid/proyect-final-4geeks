import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { estaAutenticado, esAdmin, cargando } = useAuth();

  if (cargando) {
    return <div className="container py-5">Cargando...</div>;
  }

  if (!estaAutenticado || !esAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
