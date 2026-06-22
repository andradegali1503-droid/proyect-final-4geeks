import { useEffect, useState } from "react";
import ReservationCard from "../components/ReservationCard";
import { cancelarReserva, obtenerMisReservas } from "../services/reservationService";

function MyReservations() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarReservas = async () => {
    try {
      const data = await obtenerMisReservas();
      setReservas(data);
    } catch (error) {
      console.error("Error al cargar mis reservas:", error.response?.data || error.message);
      setMensajeError("No se pudieron cargar tus reservas");
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
      setMensaje("Reserva cancelada");
      cargarReservas();
    } catch (error) {
      console.error("Error al cancelar la reserva:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo cancelar la reserva");
    }
  };

  if (cargando) {
    return <p>Cargando reservas...</p>;
  }

  return (
    <div>
      <h1 className="titulo-seccion">Mis reservas</h1>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

      {reservas.length === 0 ? (
        <p>No tienes reservas todavia.</p>
      ) : (
        reservas.map((reserva) => (
          <ReservationCard key={reserva._id} reserva={reserva} alCancelar={cancelar} />
        ))
      )}
    </div>
  );
}

export default MyReservations;
