import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
      setMensajeError(error.response?.data?.message || "No se pudo crear la cuenta");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-7 col-lg-6">
        <div className="card tarjeta-suave">
          <div className="card-body p-4">
            <h2 className="titulo-seccion">Crear cuenta</h2>

            {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

            <form onSubmit={enviarFormulario}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Nombre
                </label>
                <input
                  id="name"
                  className="form-control"
                  type="text"
                  name="name"
                  value={datosFormulario.name}
                  onChange={cambiarInput}
                />
              </div>

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

              <div className="mb-3">
                <label className="form-label" htmlFor="role">
                  Rol
                </label>
                <select
                  id="role"
                  className="form-select"
                  name="role"
                  value={datosFormulario.role}
                  onChange={cambiarInput}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <button className="btn btn-dark w-100" type="submit">
                Registrarme
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
