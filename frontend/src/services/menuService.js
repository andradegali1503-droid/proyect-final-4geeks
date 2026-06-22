import api from "./api";

export async function obtenerMenu() {
  const respuesta = await api.get("/menu");
  return respuesta.data;
}

export async function crearPlato(datosFormulario) {
  const respuesta = await api.post("/menu", datosFormulario);
  return respuesta.data;
}

export async function editarPlato(idPlato, datosFormulario) {
  const respuesta = await api.put(`/menu/${idPlato}`, datosFormulario);
  return respuesta.data;
}

export async function eliminarPlato(idPlato) {
  const respuesta = await api.delete(`/menu/${idPlato}`);
  return respuesta.data;
}
