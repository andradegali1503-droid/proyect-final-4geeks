import { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import { useAuth } from "../context/AuthContext";
import { crearReview, eliminarReview, obtenerReviews } from "../services/reviewService";

function Reviews() {
  const { estaAutenticado, esAdmin } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState({
    rating: 5,
    comment: ""
  });
  const [mensajeError, setMensajeError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarReviews = async () => {
    try {
      const data = await obtenerReviews();
      setReviews(data);
    } catch (error) {
      console.error("Error al cargar las reviews:", error.response?.data || error.message);
      setMensajeError("No se pudieron cargar las reviews");
    }
  };

  useEffect(() => {
    cargarReviews();
  }, []);

  const cambiarInput = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value
    });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setMensaje("");
    setMensajeError("");

    try {
      await crearReview(datosFormulario);
      setDatosFormulario({
        rating: 5,
        comment: ""
      });
      setMensaje("Review creada");
      cargarReviews();
    } catch (error) {
      console.error("Error al crear la review:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo crear la review");
    }
  };

  const borrarReview = async (idReview) => {
    setMensaje("");
    setMensajeError("");

    try {
      await eliminarReview(idReview);
      setMensaje("Review eliminada");
      cargarReviews();
    } catch (error) {
      console.error("Error al eliminar la review:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo eliminar la review");
    }
  };

  return (
    <div>
      <h1 className="titulo-seccion">Reviews</h1>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

      {estaAutenticado && (
        <div className="card tarjeta-suave mb-4">
          <div className="card-body">
            <h3 className="h5 mb-3">Deja tu opinion</h3>
            <form onSubmit={enviarFormulario}>
              <div className="row g-3">
                <div className="col-md-3">
                  <select
                    className="form-select"
                    name="rating"
                    value={datosFormulario.rating}
                    onChange={cambiarInput}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                <div className="col-md-9">
                  <input
                    className="form-control"
                    type="text"
                    name="comment"
                    placeholder="Escribe tu comentario"
                    value={datosFormulario.comment}
                    onChange={cambiarInput}
                  />
                </div>
              </div>

              <button className="btn btn-dark mt-3" type="submit">
                Enviar review
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="row g-4">
        {reviews.map((review) => (
          <div className="col-md-6 col-lg-4" key={review._id}>
            <ReviewCard review={review} sePuedeEliminar={esAdmin} alEliminar={borrarReview} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
