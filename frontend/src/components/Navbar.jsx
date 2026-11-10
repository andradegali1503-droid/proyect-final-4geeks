import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sparkles, CalendarCheck, Shield, LogOut, User } from "lucide-react";

function Navbar() {
  const { usuario, cerrarSesion, esAdmin } = useAuth();

  return (
    <header className="navbar-floating-wrapper sticky-top">
      <nav className="navbar navbar-expand-lg navbar-floating">
        <div className="container-fluid px-2 px-md-3">
          {/* Marca / Identidad */}
          <Link className="navbar-brand d-flex align-items-center gap-2 text-decoration-none py-0" to="/">
            <div className="d-flex flex-column">
              <span className="navbar-floating__brand">L'ATELIER NOIR</span>
              <span className="navbar-floating__sub">3 MICHELIN STARS</span>
            </div>
          </Link>

          {/* Botón Móvil */}
          <button
            className="navbar-toggler navbar-toggler-luxury border-0 d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuFlotante"
            aria-controls="menuFlotante"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Menú de Enlaces */}
          <div className="collapse navbar-collapse" id="menuFlotante">
            <ul className="navbar-nav mx-auto my-2 my-lg-0 gap-1 gap-lg-1 align-items-lg-center">
              <li className="nav-item">
                <NavLink className="nav-link-floating" to="/">
                  La Experiencia
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link-floating" to="/menu">
                  Menú & Carta
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link-floating" to="/reviews">
                  Críticas
                </NavLink>
              </li>
              {usuario && (
                <li className="nav-item">
                  <NavLink className="nav-link-floating" to="/mis-reservas">
                    Mis Reservas
                  </NavLink>
                </li>
              )}
              {esAdmin && (
                <li className="nav-item">
                  <NavLink className="nav-link-floating text-warning d-inline-flex align-items-center gap-1" to="/admin">
                    <Shield size={13} /> Maître d'
                  </NavLink>
                </li>
              )}
            </ul>

            {/* Acciones */}
            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
              <Link to="/reservar" className="btn-floating-reserve text-decoration-none">
                <CalendarCheck size={14} /> Reservar Mesa
              </Link>

              {usuario ? (
                <div className="d-flex align-items-center gap-2 ms-lg-2">
                  <span className="floating-user-pill">
                    <User size={13} className="text-warning" /> {usuario.name}
                  </span>
                  <button
                    className="floating-logout-btn"
                    onClick={cerrarSesion}
                    title="Cerrar Sesión"
                  >
                    <LogOut size={12} />
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-2 ms-lg-2">
                  <Link className="floating-ghost-btn text-decoration-none" to="/login">
                    Acceso
                  </Link>
                  <Link className="floating-text-link text-decoration-none" to="/registro">
                    Registro
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
