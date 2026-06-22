import api from "./api";

export async function registrarUsuario(datosFormulario) {
  const respuesta = await api.post("/auth/register", datosFormulario);
  return respuesta.data;
}

export async function loginUsuario(datosFormulario) {
  const respuesta = await api.post("/auth/login", datosFormulario);
  return respuesta.data;
}

export async function obtenerPerfil() {
  const respuesta = await api.get("/auth/me");
  return respuesta.data;
}
