import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sparkles, ShieldCheck, AlertTriangle } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const { crearCuenta } = useAuth();
  const [datosFormulario, setDatosFormulario] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  const [mensajeError, setMensajeError] = useState("");

  const cambiarInput = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value
    });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setMensajeError("");

    try {
      await crearCuenta(datosFormulario);
      navigate("/");
    } catch (error) {
      console.error("Error al crear la cuenta:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo registrar su expediente de huésped");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-3"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                border: "1px solid rgba(200, 162, 106, 0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "radial-gradient(circle at center, rgba(200, 162, 106, 0.2) 0%, rgba(20, 18, 17, 0.8) 100%)",
                color: "#c5a059",
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "1.6rem",
                boxShadow: "0 0 20px rgba(197, 160, 89, 0.2)"
              }}
            >
              A
            </div>
            <h2 className="text-white font-serif fw-light mb-1" style={{ letterSpacing: "0.05em", fontSize: "1.85rem" }}>
              Registro de Huésped
            </h2>
            <p className="text-white-50 small mb-0" style={{ letterSpacing: "0.08em" }}>
              Personalice sus futuras visitas y preferencias en L'Atelier Noir
            </p>
          </div>

          <div className="card tarjeta-suave" style={{ border: "1px solid rgba(200, 162, 106, 0.3)" }}>
            <div className="card-body p-4 p-md-5">
              {mensajeError && (
                <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 border-0 text-white" style={{ background: "rgba(198, 40, 40, 0.25)", border: "1px solid rgba(239, 83, 80, 0.4)" }}>
                  <AlertTriangle size={16} className="text-danger flex-shrink-0" />
                  <span className="small">{mensajeError}</span>
                </div>
              )}

              <form onSubmit={enviarFormulario}>
                <div className="mb-3">
                  <label className="form-label text-white-50 small" htmlFor="name">
                    Nombre
                  </label>
                  <input
                    id="name"
                    className="form-control bg-dark text-white border-secondary"
                    type="text"
                    name="name"
                    placeholder="Nombre y apellidos"
                    value={datosFormulario.name}
                    onChange={cambiarInput}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-white-50 small" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className="form-control bg-dark text-white border-secondary"
                    type="email"
                    name="email"
                    placeholder="huesped@latelier.com"
                    value={datosFormulario.email}
                    onChange={cambiarInput}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-white-50 small" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    className="form-control bg-dark text-white border-secondary"
                    type="password"
                    name="password"
                    placeholder="Mínimo 6 caracteres"
                    value={datosFormulario.password}
                    onChange={cambiarInput}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-white-50 small" htmlFor="role">
                    Rol
                  </label>
                  <select
                    id="role"
                    className="form-select bg-dark text-white border-secondary"
                    name="role"
                    value={datosFormulario.role}
                    onChange={cambiarInput}
                  >
                    <option value="user">user (Huésped Culinario)</option>
                    <option value="admin">admin (Maître d' / Gestión)</option>
                  </select>
                </div>

                <button
                  className="btn btn-warning w-100 fw-semibold text-dark py-2 mb-3 rounded-pill"
                  type="submit"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Crear cuenta
                </button>
              </form>

              <div className="text-center pt-3 border-top" style={{ borderColor: "rgba(255, 255, 255, 0.08) !important" }}>
                <span className="text-white-50 small">¿Ya dispone de expediente de huésped? </span>
                <Link to="/login" className="text-warning small text-decoration-none fw-medium">
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
