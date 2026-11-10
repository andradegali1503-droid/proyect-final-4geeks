import { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import { useAuth } from "../context/AuthContext";
import { crearReview, eliminarReview, obtenerReviews } from "../services/reviewService";
import { Star, Sparkles, MessageSquareQuote, CheckCircle2, AlertTriangle, Send } from "lucide-react";

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
      setReviews(data || []);
    } catch (error) {
      console.error("Error al cargar las reviews:", error.response?.data || error.message);
      setMensajeError("No se pudieron cargar las impresiones de los comensales");
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
      setMensaje("Agradecemos sinceramente su testimonio gastronómico.");
      cargarReviews();
    } catch (error) {
      console.error("Error al crear la review:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo registrar su comentario");
    }
  };

  const borrarReview = async (idReview) => {
    const confirmar = window.confirm("¿Seguro que desea retirar esta reseña?");
    if (!confirmar) return;

    setMensaje("");
    setMensajeError("");

    try {
      await eliminarReview(idReview);
      setMensaje("Testimonio retirado con éxito");
      cargarReviews();
    } catch (error) {
      console.error("Error al eliminar la review:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo retirar el testimonio");
    }
  };

  return (
    <div className="container py-4">
      {/* Encabezado Editorial */}
      <div className="text-center mb-5">
        <div className="d-inline-flex align-items-center gap-2 mb-2">
          <span className="badge-atelier-gold">
            <Sparkles size={13} className="text-warning" /> Libro de Firmas & Crítica Gastronómica
          </span>
        </div>
        <h1 className="display-5 text-white fw-light font-serif mb-2" style={{ letterSpacing: "0.03em" }}>
          Impresiones de Sala
        </h1>
        <p className="text-white-50 mx-auto" style={{ maxWidth: "620px", fontSize: "0.95rem", lineHeight: "1.7" }}>
          La memoria viva de quienes han compartido mesa en L'Atelier Noir. Cada opinión guía nuestro compromiso con la excelencia y la hospitalidad sin concesiones.
        </p>
      </div>

      {mensaje && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4 border-0 text-white" style={{ background: "rgba(46, 125, 50, 0.25)", border: "1px solid rgba(76, 175, 80, 0.4)" }}>
          <CheckCircle2 size={16} className="text-success" />
          <span>{mensaje}</span>
        </div>
      )}
      {mensajeError && (
        <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 border-0 text-white" style={{ background: "rgba(198, 40, 40, 0.25)", border: "1px solid rgba(239, 83, 80, 0.4)" }}>
          <AlertTriangle size={16} className="text-danger" />
          <span>{mensajeError}</span>
        </div>
      )}

      {/* Formulario de Testimonio para Comensales Autenticados */}
      {estaAutenticado ? (
        <div className="card tarjeta-suave p-4 p-md-5 mb-5 mx-auto" style={{ maxWidth: "780px", border: "1px solid rgba(200, 162, 106, 0.3)" }}>
          <div className="d-flex align-items-center gap-2 mb-3">
            <MessageSquareQuote size={20} className="text-warning" />
            <h4 className="text-white font-serif mb-0">Comparta su Experiencia Sensorial</h4>
          </div>

          <form onSubmit={enviarFormulario}>
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label text-white-50 small">Valoración Culinaria</label>
                <select
                  className="form-select bg-dark text-white border-secondary"
                  name="rating"
                  value={datosFormulario.rating}
                  onChange={cambiarInput}
                >
                  <option value="5">★★★★★ Excepcional (5/5)</option>
                  <option value="4">★★★★☆ Muy Destacable (4/5)</option>
                  <option value="3">★★★☆☆ Fiel a la propuesta (3/5)</option>
                  <option value="2">★★☆☆☆ Oportunidad de mejora (2/5)</option>
                  <option value="1">★☆☆☆☆ Insatisfactorio (1/5)</option>
                </select>
              </div>

              <div className="col-md-8">
                <label className="form-label text-white-50 small">Crítica de Servicio & Menú</label>
                <textarea
                  className="form-control bg-dark text-white border-secondary"
                  name="comment"
                  rows="3"
                  placeholder="Detalles sobre los pases degustados, el servicio de sumillería o la atmósfera..."
                  value={datosFormulario.comment}
                  onChange={cambiarInput}
                  required
                />
              </div>
            </div>

            <div className="text-end">
              <button className="btn btn-warning fw-semibold text-dark rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2" type="submit">
                <Send size={15} /> Publicar en el Cuaderno de Huéspedes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-3 rounded-pill text-center mb-5 text-white-50 small mx-auto" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", maxWidth: "540px" }}>
          Para dejar una reseña verificada, inicie sesión con su cuenta de huésped.
        </div>
      )}

      {/* Grid de Reseñas */}
      <div className="row g-4">
        {reviews.length === 0 ? (
          <div className="col-12 text-center py-5 text-white-50">
            Aún no se han registrado impresiones en este servicio. Sea el primero en compartir su velada.
          </div>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="col-md-6">
              <ReviewCard review={rev} sePuedeEliminar={esAdmin} alEliminar={borrarReview} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reviews;
