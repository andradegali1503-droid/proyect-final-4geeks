import { Calendar, Clock, Users, MapPin, Sparkles, AlertCircle, Printer, XCircle } from "lucide-react";

function ReservationCard({ reserva, alCancelar }) {
  const codigo = `ATELIER-${reserva._id ? reserva._id.slice(-6).toUpperCase() : "VIP"}`;
  const esTerraza = reserva.area === "terrace";

  return (
    <div
      className="card tarjeta-suave mb-4"
      style={{
        borderLeft: "4px solid #c5a059",
        background: "linear-gradient(160deg, rgba(26, 23, 21, 0.95) 0%, rgba(14, 12, 11, 0.98) 100%)",
        overflow: "hidden",
        boxShadow: "0 12px 36px rgba(0, 0, 0, 0.45)"
      }}
    >
      <div className="card-body p-4 p-md-5">
        {/* Cabecera del Pase */}
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge-atelier-gold" style={{ fontSize: "0.68rem" }}>
                <Sparkles size={11} className="text-warning" /> Pase de Huésped VIP
              </span>
              <span className="text-warning small font-monospace fw-bold">{codigo}</span>
            </div>
            <h4 className="text-white font-serif mb-1" style={{ fontSize: "1.35rem", letterSpacing: "0.02em" }}>
              L'Atelier Noir • {esTerraza ? "L'Orangerie (Terraza)" : "Le Grand Salon"}
            </h4>
            <span className="text-white-50 small">Mesa confirmada en servicio de alta gastronomía</span>
          </div>

          <div>
            <span
              className={`badge px-3 py-2 text-uppercase ${
                reserva.status === "confirmed"
                  ? "bg-success bg-opacity-25 text-success border border-success"
                  : reserva.status === "cancelled"
                  ? "bg-danger bg-opacity-25 text-danger border border-danger"
                  : "bg-warning bg-opacity-25 text-warning border border-warning"
              }`}
              style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}
            >
              {reserva.status === "confirmed" ? "Confirmada" : reserva.status === "cancelled" ? "Cancelada" : "En Revisión"}
            </span>
          </div>
        </div>

        {/* Detalles en Grid */}
        <div className="row g-3 py-3 my-2 border-top border-bottom" style={{ borderColor: "rgba(200, 162, 106, 0.2) !important" }}>
          <div className="col-sm-3 col-6">
            <span className="text-white-50 small d-flex align-items-center gap-1 mb-1">
              <Calendar size={13} className="text-warning" /> Fecha
            </span>
            <span className="text-white fw-medium font-monospace">{reserva.date?.slice(0, 10)}</span>
          </div>

          <div className="col-sm-3 col-6">
            <span className="text-white-50 small d-flex align-items-center gap-1 mb-1">
              <Clock size={13} className="text-warning" /> Hora
            </span>
            <span className="text-white fw-medium font-monospace">{reserva.time} h</span>
          </div>

          <div className="col-sm-3 col-6">
            <span className="text-white-50 small d-flex align-items-center gap-1 mb-1">
              <Users size={13} className="text-warning" /> Comensales
            </span>
            <span className="text-white fw-medium">{reserva.people} personas</span>
          </div>

          <div className="col-sm-3 col-6">
            <span className="text-white-50 small d-flex align-items-center gap-1 mb-1">
              <MapPin size={13} className="text-warning" /> Ubicación
            </span>
            <span className="text-white fw-medium">{esTerraza ? "Terraza Acristalada" : "Salón Principal"}</span>
          </div>
        </div>

        {/* Protocolo y Acciones */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 pt-3">
          <div className="text-white-50 small d-flex align-items-center gap-2" style={{ fontSize: "0.8rem" }}>
            <AlertCircle size={14} className="text-warning" />
            <span>Cortesía de 15 min • Código: <em>Smart Elegant</em></span>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-light d-inline-flex align-items-center gap-1 rounded-pill px-3"
              onClick={() => window.print()}
            >
              <Printer size={13} /> Imprimir Pase
            </button>

            {reserva.status !== "cancelled" && alCancelar && (
              <button
                className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1 rounded-pill px-3"
                onClick={() => {
                  const confirmar = window.confirm("¿Desea anular su reserva en L'Atelier Noir?");
                  if (confirmar) alCancelar(reserva._id);
                }}
              >
                <XCircle size={13} /> Cancelar Reserva
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
