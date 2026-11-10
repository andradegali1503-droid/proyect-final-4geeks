import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sparkles, Shield, Lock, Mail, AlertTriangle } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { iniciarSesion } = useAuth();
  const [datosFormulario, setDatosFormulario] = useState({
    email: "",
    password: ""
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
      await iniciarSesion(datosFormulario);
      navigate("/");
    } catch (error) {
      const errorBackend = error.response?.data;

      console.error("Error al iniciar sesion:", {
        status: error.response?.status,
        mensaje: errorBackend?.message || error.message,
        detalle: errorBackend?.detalle,
        errores: errorBackend?.errors
      });

      setMensajeError(
        errorBackend?.message ||
          errorBackend?.detalle ||
          "Credenciales no válidas. Por favor verifique sus datos de acceso."
      );
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
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
              Acceso a Huéspedes
            </h2>
            <p className="text-white-50 small mb-0" style={{ letterSpacing: "0.08em" }}>
              L'Atelier Noir • Haute Cuisine & Private Dining
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

                <div className="mb-4">
                  <label className="form-label text-white-50 small" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    className="form-control bg-dark text-white border-secondary"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={datosFormulario.password}
                    onChange={cambiarInput}
                    required
                  />
                </div>

                <button
                  className="btn btn-warning w-100 fw-semibold text-dark py-2 mb-3 rounded-pill"
                  type="submit"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Entrar
                </button>
              </form>

              <div className="text-center pt-3 border-top" style={{ borderColor: "rgba(255, 255, 255, 0.08) !important" }}>
                <span className="text-white-50 small">¿No dispone de registro de huésped? </span>
                <Link to="/registro" className="text-warning small text-decoration-none fw-medium">
                  Crear Cuenta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
