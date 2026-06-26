import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
          "No se pudo iniciar sesion. Revisa el email, la password o el backend desplegado."
      );
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="card tarjeta-suave">
          <div className="card-body p-4">
            <h2 className="titulo-seccion">Iniciar sesion</h2>

            {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

            <form onSubmit={enviarFormulario}>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  className="form-control"
                  type="email"
                  name="email"
                  value={datosFormulario.email}
                  onChange={cambiarInput}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  className="form-control"
                  type="password"
                  name="password"
                  value={datosFormulario.password}
                  onChange={cambiarInput}
                />
              </div>

              <button className="btn btn-dark w-100" type="submit">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
