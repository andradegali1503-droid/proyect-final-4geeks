import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { usuario, cerrarSesion, esAdmin } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container py-2">
        <Link className="navbar-brand fw-bold" to="/">
          MesaClick
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <div className="navbar-nav me-auto">
            <NavLink className="nav-link" to="/">
              Inicio
            </NavLink>
            <NavLink className="nav-link" to="/menu">
              Menu
            </NavLink>
            <NavLink className="nav-link" to="/reviews">
              Reviews
            </NavLink>
            {usuario && (
              <>
                <NavLink className="nav-link" to="/reservar">
                  Reservar
                </NavLink>
                <NavLink className="nav-link" to="/mis-reservas">
                  Mis reservas
                </NavLink>
              </>
            )}
            {esAdmin && (
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
            )}
          </div>

          <div className="d-flex gap-2">
            {usuario ? (
              <>
                <span className="navbar-text">Hola, {usuario.name}</span>
                <button className="btn btn-outline-dark btn-sm" onClick={cerrarSesion}>
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-dark btn-sm" to="/login">
                  Login
                </Link>
                <Link className="btn btn-dark btn-sm" to="/registro">
                  Registro
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
