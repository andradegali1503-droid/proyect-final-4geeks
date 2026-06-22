import { useEffect, useState } from "react";
import { cambiarEstadoReserva, obtenerTodasLasReservas } from "../services/reservationService";

function AdminDashboard() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const cargarReservas = async () => {
    try {
      const data = await obtenerTodasLasReservas();
      setReservas(data);
    } catch (error) {
      console.error("Error al cargar reservas del panel admin:", error.response?.data || error.message);
      setMensajeError("No se pudieron cargar las reservas");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const actualizarEstado = async (idReserva, status) => {
    setMensaje("");
    setMensajeError("");

    try {
      await cambiarEstadoReserva(idReserva, status);
      setMensaje("Estado actualizado");
      cargarReservas();
    } catch (error) {
      console.error("Error al actualizar el estado de la reserva:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo actualizar el estado");
    }
  };

  if (cargando) {
    return <p>Cargando panel admin...</p>;
  }

  return (
    <div className="fondo-admin">
      <h1 className="titulo-seccion">Panel de administrador</h1>
      <p className="text-muted">Aqui puedes revisar las reservas creadas en el sistema.</p>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Area</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva._id}>
                <td>{reserva.user?.name}</td>
                <td>{reserva.date?.slice(0, 10)}</td>
                <td>{reserva.time}</td>
                <td>{reserva.area}</td>
                <td>{reserva.status}</td>
                <td>
                  <div className="d-flex gap-2 flex-wrap">
                    <button className="btn btn-outline-success btn-sm" onClick={() => actualizarEstado(reserva._id, "confirmed")}>
                      Confirmar
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => actualizarEstado(reserva._id, "cancelled")}>
                      Cancelar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
