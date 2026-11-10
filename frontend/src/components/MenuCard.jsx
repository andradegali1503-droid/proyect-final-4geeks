import { Sparkles, Edit2, Trash2, Award } from "lucide-react";

function MenuCard({ plato, sePuedeEliminar, alEditar, alEliminar }) {
  return (
    <article
      className="card tarjeta-suave h-100 overflow-hidden d-flex flex-column"
      style={{
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease",
        border: "1px solid rgba(200, 162, 106, 0.22)"
      }}
    >
      <div className="position-relative" style={{ height: "210px", overflow: "hidden", background: "#12100f" }}>
        {plato.image ? (
          <img
            className="w-100 h-100 object-fit-cover"
            src={plato.image}
            alt={plato.name}
            loading="lazy"
            style={{
              filter: "brightness(0.92) contrast(1.05)",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          />
        ) : (
          <div
            className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white-50"
            style={{
              background: "radial-gradient(circle at center, rgba(35, 29, 25, 0.9) 0%, rgba(12, 11, 10, 0.95) 100%)"
            }}
          >
            <span
              className="font-serif text-warning fs-2 mb-1 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "48px", height: "48px", border: "1px solid rgba(200, 162, 106, 0.4)", background: "rgba(200, 162, 106, 0.08)" }}
            >
              A
            </span>
            <span className="small text-uppercase text-warning-50" style={{ letterSpacing: "0.22em", fontSize: "0.68rem" }}>
              L'Atelier Noir
            </span>
          </div>
        )}

        <div className="position-absolute top-0 start-0 m-3">
          <span className="badge-atelier-gold" style={{ fontSize: "0.65rem", padding: "0.3rem 0.65rem" }}>
            {plato.category || "Alta Cocina"}
          </span>
        </div>

        <div className="position-absolute bottom-0 end-0 m-3">
          <span
            className="badge fw-bold font-monospace px-3 py-2"
            style={{
              fontSize: "0.9rem",
              background: "rgba(12, 11, 10, 0.85)",
              color: "#e5cb96",
              border: "1px solid rgba(200, 162, 106, 0.4)",
              backdropFilter: "blur(8px)"
            }}
          >
            {typeof plato.price === "number" ? plato.price.toFixed(2) : plato.price} €
          </span>
        </div>
      </div>

      <div className="card-body p-4 d-flex flex-column flex-grow-1">
        <h4 className="text-white font-serif mb-2" style={{ fontSize: "1.25rem", letterSpacing: "0.02em" }}>
          {plato.name}
        </h4>
        <p className="text-white-50 small flex-grow-1 mb-3" style={{ lineHeight: "1.7", fontSize: "0.85rem" }}>
          {plato.description}
        </p>

        <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto" style={{ borderColor: "rgba(255, 255, 255, 0.08) !important" }}>
          <span className={`small d-inline-flex align-items-center gap-2 ${plato.available ? "text-success" : "text-white-50"}`} style={{ fontSize: "0.75rem" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: plato.available ? "#4CAF50" : "#666",
                boxShadow: plato.available ? "0 0 8px rgba(76, 175, 80, 0.6)" : "none"
              }}
            ></span>
            {plato.available ? "Disponible en Servicio" : "Agotado por Temporada"}
          </span>

          {sePuedeEliminar && (
            <div className="d-flex gap-1">
              <button
                className="btn btn-sm btn-outline-warning p-1 px-2"
                type="button"
                onClick={() => alEditar(plato)}
                title="Editar Creación"
              >
                <Edit2 size={13} />
              </button>
              <button
                className="btn btn-sm btn-outline-danger p-1 px-2"
                type="button"
                onClick={() => alEliminar(plato._id)}
                title="Retirar de Carta"
              >
                <Trash2 size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default MenuCard;
