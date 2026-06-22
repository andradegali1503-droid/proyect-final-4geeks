import api from "./api";

export async function obtenerReviews() {
  const respuesta = await api.get("/reviews");
  return respuesta.data;
}

export async function crearReview(datosFormulario) {
  const respuesta = await api.post("/reviews", datosFormulario);
  return respuesta.data;
}

export async function eliminarReview(idReview) {
  const respuesta = await api.delete(`/reviews/${idReview}`);
  return respuesta.data;
}
