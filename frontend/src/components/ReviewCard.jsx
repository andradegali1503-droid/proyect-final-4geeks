import { Star, Sparkles, Trash2, CheckCircle2, Quote } from "lucide-react";

function ReviewCard({ review, sePuedeEliminar, alEliminar }) {
  const estrellas = Array.from({ length: 5 }, (_, i) => i < review.rating);

  return (
    <div
      className="card tarjeta-suave h-100"
      style={{
        borderLeft: "3px solid #c5a059",
        background: "linear-gradient(165deg, rgba(24, 21, 19, 0.95) 0%, rgba(14, 12, 11, 0.98) 100%)",
        transition: "transform 0.25s ease, border-color 0.25s ease"
      }}
    >
      <div className="card-body p-4 d-flex flex-column">
        {/* Cabecera */}
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <div>
            <div className="d-flex align-items-center gap-1 mb-1">
              <span className="badge-atelier-gold" style={{ fontSize: "0.65rem", padding: "0.25rem 0.6rem" }}>
                <CheckCircle2 size={11} className="text-warning" /> Comensal Verificado
              </span>
            </div>
            <h5 className="text-white font-serif mb-0" style={{ fontSize: "1.15rem" }}>
              {review.user?.name || "Huésped Distinguido"}
            </h5>
          </div>

          <div className="d-flex gap-1" title={`${review.rating} de 5 estrellas`}>
            {estrellas.map((activa, idx) => (
              <Star
                key={idx}
                size={14}
                className={activa ? "text-warning fill-warning" : "text-white-50 opacity-20"}
                fill={activa ? "#c5a059" : "none"}
              />
            ))}
          </div>
        </div>

        {/* Comentario gastronómico */}
        <div className="position-relative flex-grow-1 mb-3">
          <p
            className="text-white-50 small mb-0 fst-italic"
            style={{ lineHeight: "1.75", fontSize: "0.9rem", color: "rgba(245, 240, 233, 0.82)" }}
          >
            «{review.comment}»
          </p>
        </div>

        {/* Pie con fecha o acciones */}
        <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto" style={{ borderColor: "rgba(255, 255, 255, 0.08) !important" }}>
          <span className="text-white-50 small" style={{ fontSize: "0.74rem" }}>
            Experiencia en sala • {review.createdAt ? review.createdAt.slice(0, 10) : "Servicio Reciente"}
          </span>

          {sePuedeEliminar && (
            <button
              className="btn btn-sm btn-outline-danger p-1 px-2 d-inline-flex align-items-center gap-1"
              type="button"
              onClick={() => alEliminar(review._id)}
              title="Retirar testimonio"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
