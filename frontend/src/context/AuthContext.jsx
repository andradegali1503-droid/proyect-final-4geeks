import { createContext, useContext, useEffect, useState } from "react";
import { loginUsuario, obtenerPerfil, registrarUsuario } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarSesion = async () => {
      const usuarioGuardado = localStorage.getItem("usuario");
      const tokenGuardado = localStorage.getItem("token");

      if (!tokenGuardado) {
        setCargando(false);
        return;
      }

      setToken(tokenGuardado);

      if (usuarioGuardado) {
        setUsuario(JSON.parse(usuarioGuardado));
      }

      try {
        const perfil = await obtenerPerfil();
        const usuarioActualizado = {
          _id: perfil._id,
          name: perfil.name,
          email: perfil.email,
          role: perfil.role
        };

        setUsuario(usuarioActualizado);
        localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
      } catch (error) {
        console.error("Error al recuperar la sesion guardada:", error.response?.data || error.message);
        setUsuario(null);
        setToken("");
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
      } finally {
        setCargando(false);
      }
    };

    cargarSesion();
  }, []);

  const guardarSesion = (datos) => {
    const usuarioNuevo = {
      _id: datos._id,
      name: datos.name,
      email: datos.email,
      role: datos.role
    };

    setUsuario(usuarioNuevo);
    setToken(datos.token);
    localStorage.setItem("usuario", JSON.stringify(usuarioNuevo));
    localStorage.setItem("token", datos.token);
  };

  const iniciarSesion = async (datosFormulario) => {
    const respuesta = await loginUsuario(datosFormulario);
    guardarSesion(respuesta);
    return respuesta;
  };

  const crearCuenta = async (datosFormulario) => {
    const respuesta = await registrarUsuario(datosFormulario);
    guardarSesion(respuesta);
    return respuesta;
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setToken("");
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        cargando,
        iniciarSesion,
        crearCuenta,
        cerrarSesion,
        estaAutenticado: Boolean(token),
        esAdmin: usuario?.role === "admin"
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
