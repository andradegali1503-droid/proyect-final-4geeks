import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReservationCard from "../components/ReservationCard";
import { cancelarReserva, obtenerMisReservas } from "../services/reservationService";
import { Sparkles, CalendarPlus, CheckCircle, AlertTriangle, Clock } from "lucide-react";

function MyReservations() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarReservas = async () => {
    try {
      const data = await obtenerMisReservas();
      setReservas(data || []);
    } catch (error) {
      console.error("Error al cargar mis reservas:", error.response?.data || error.message);
      setMensajeError("No se pudieron cargar sus reservas");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const cancelar = async (idReserva) => {
    try {
      await cancelarReserva(idReserva);
      setMensaje("Su reserva ha sido cancelada satisfactoriamente.");
      cargarReservas();
    } catch (error) {
      console.error("Error al cancelar la reserva:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo cancelar la reserva");
    }
  };

  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning mb-3" role="status"></div>
        <p className="text-white-50">Accediendo a su expediente privado de reservas...</p>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: "880px" }}>
      {/* Encabezado */}
      <div
        className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 pb-3 border-bottom"
        style={{ borderColor: "rgba(200, 162, 106, 0.2) !important" }}
      >
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge-atelier-gold">
              <Sparkles size={12} className="text-warning" /> Historial de Huésped Distinguido
            </span>
          </div>
          <h1 className="h2 font-serif text-white mb-0">Mis Reservas & Experiencias</h1>
        </div>

        <Link
          className="btn btn-warning fw-semibold text-dark d-inline-flex align-items-center gap-2 rounded-pill px-4 py-2"
          to="/reservar"
        >
          <CalendarPlus size={16} /> Nueva Reserva
        </Link>
      </div>

      {mensaje && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4 border-0 text-white" style={{ background: "rgba(46, 125, 50, 0.25)", border: "1px solid rgba(76, 175, 80, 0.4)" }}>
          <CheckCircle size={16} className="text-success" />
          <span>{mensaje}</span>
        </div>
      )}
      {mensajeError && (
        <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 border-0 text-white" style={{ background: "rgba(198, 40, 40, 0.25)", border: "1px solid rgba(239, 83, 80, 0.4)" }}>
          <AlertTriangle size={16} className="text-danger" />
          <span>{mensajeError}</span>
        </div>
      )}

      {reservas.length === 0 ? (
        <div className="card tarjeta-suave text-center py-5 px-3">
          <Sparkles size={40} className="text-warning mx-auto mb-3 opacity-40" />
          <h4 className="text-white font-serif mb-2">No dispone de reservas activas</h4>
          <p className="text-white-50 small mx-auto mb-4" style={{ maxWidth: "460px", lineHeight: "1.7" }}>
            Le invitamos a descubrir nuestros menús degustación y asegurar su mesa con antelación en L'Atelier Noir.
          </p>
          <div>
            <Link className="btn btn-warning text-dark fw-semibold rounded-pill px-4 py-2" to="/reservar">
              Reservar Mesa Ahora
            </Link>
          </div>
        </div>
      ) : (
        reservas.map((reserva) => (
          <ReservationCard key={reserva._id} reserva={reserva} alCancelar={cancelar} />
        ))
      )}
    </div>
  );
}

export default MyReservations;
