import api from "./api";

export async function crearReserva(datosFormulario) {
  const respuesta = await api.post("/reservations", datosFormulario);
  return respuesta.data;
}

export async function obtenerMisReservas() {
  const respuesta = await api.get("/reservations/mine");
  return respuesta.data;
}

export async function cancelarReserva(idReserva) {
  const respuesta = await api.patch(`/reservations/mine/${idReserva}/cancel`);
  return respuesta.data;
}

export async function obtenerTodasLasReservas() {
  const respuesta = await api.get("/reservations");
  return respuesta.data;
}

export async function cambiarEstadoReserva(idReserva, status) {
  const respuesta = await api.patch(`/reservations/${idReserva}/status`, { status });
  return respuesta.data;
}
