import { useEffect, useRef, useState } from "react";
import {
  actualizarReservaAdmin,
  cambiarEstadoReserva,
  eliminarReservaAdmin,
  obtenerTodasLasReservas
} from "../services/reservationService";

const formularioInicial = {
  date: "",
  time: "",
  people: 2,
  area: "indoor",
  status: "pending"
};

const formatearFechaLocal = (valorFecha) => {
  const fecha = new Date(valorFecha);

  if (Number.isNaN(fecha.getTime())) {
    return "";
  }

  return fecha.toISOString().slice(0, 10);
};

function AdminDashboard() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [reservaEditando, setReservaEditando] = useState("");
  const [formulario, setFormulario] = useState(formularioInicial);
  const referenciaFormulario = useRef(null);

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

  const limpiarFormulario = () => {
    setReservaEditando("");
    setFormulario(formularioInicial);
  };

  const abrirEdicion = (reserva) => {
    setMensaje("");
    setMensajeError("");
    setReservaEditando(reserva._id);
    setFormulario({
      date: reserva.date ? formatearFechaLocal(reserva.date) : "",
      time: reserva.time || "",
      people: reserva.people || 2,
      area: reserva.area || "indoor",
      status: reserva.status || "pending"
    });

    setTimeout(() => {
      referenciaFormulario.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 50);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((formularioActual) => ({
      ...formularioActual,
      [name]: name === "people" ? Number(value) : value
    }));
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    setMensaje("");
    setMensajeError("");

    try {
      const reservaActualizada = await actualizarReservaAdmin(reservaEditando, formulario);
      setReservas((reservasActuales) =>
        reservasActuales.map((reserva) => (reserva._id === reservaEditando ? reservaActualizada : reserva))
      );
      setMensaje("Reserva actualizada");
      limpiarFormulario();
    } catch (error) {
      console.error("Error al actualizar la reserva:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo actualizar la reserva");
    }
  };

  const cambiarEstado = async (idReserva, status) => {
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

  const borrarReserva = async (idReserva) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar esta reserva?");

    if (!confirmar) {
      return;
    }

    setMensaje("");
    setMensajeError("");

    try {
      await eliminarReservaAdmin(idReserva);
      setMensaje("Reserva eliminada");
      if (reservaEditando === idReserva) {
        limpiarFormulario();
      }
      cargarReservas();
    } catch (error) {
      console.error("Error al eliminar la reserva:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo eliminar la reserva");
    }
  };

  if (cargando) {
    return <p>Cargando panel admin...</p>;
  }

  return (
    <div className="fondo-admin panel-admin">
      <div className="admin-head">
        <p className="hero-cine__eyebrow mb-2">Operations</p>
        <h1 className="titulo-seccion mb-2">Panel de administrador</h1>
        <p className="text-muted mb-0">Gestion simple de reservas con una vista que funciona en desktop y mobile.</p>
      </div>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

      {reservaEditando && (
        <section className="menu-editor-admin tarjeta-cine panel-admin__editor" ref={referenciaFormulario}>
          <div className="menu-editor-admin__cabecera">
            <div>
              <p className="tarjeta-cine__eyebrow mb-1">Editar reserva</p>
              <h2 className="menu-editor-admin__titulo mb-0">Reserva seleccionada</h2>
            </div>
            <p className="menu-editor-admin__texto mb-0">
              Ajusta fecha, hora, personas, area o estado y guarda los cambios.
            </p>
          </div>

          <form onSubmit={guardarCambios} className="menu-editor-admin__form">
            <div className="menu-editor-admin__grid">
              <label className="campo-cine">
                <span>Fecha</span>
                <input className="form-control" name="date" type="date" value={formulario.date} onChange={manejarCambio} />
              </label>

              <label className="campo-cine">
                <span>Hora</span>
                <input className="form-control" name="time" type="time" value={formulario.time} onChange={manejarCambio} />
              </label>

              <label className="campo-cine">
                <span>Personas</span>
                <input
                  className="form-control"
                  name="people"
                  type="number"
                  min="1"
                  max="12"
                  value={formulario.people}
                  onChange={manejarCambio}
                />
              </label>

              <label className="campo-cine">
                <span>Area</span>
                <select className="form-select" name="area" value={formulario.area} onChange={manejarCambio}>
                  <option value="indoor">indoor</option>
                  <option value="terrace">terrace</option>
                </select>
              </label>

              <label className="campo-cine campo-cine--ancho">
                <span>Estado</span>
                <select className="form-select" name="status" value={formulario.status} onChange={manejarCambio}>
                  <option value="pending">pending</option>
                  <option value="confirmed">confirmed</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </label>
            </div>

            <div className="menu-editor-admin__acciones">
              <button className="btn btn-dark" type="submit">
                Guardar cambios
              </button>
              <button className="btn btn-outline-secondary" type="button" onClick={limpiarFormulario}>
                Cancelar edicion
              </button>
            </div>
          </form>
        </section>
      )}

      <div className="d-none d-lg-block table-responsive tabla-cine">
        <table className="table align-middle table-dark table-borderless mb-0">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Area</th>
              <th>Personas</th>
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
                <td>{reserva.people}</td>
                <td>{reserva.status}</td>
                <td>
                  <div className="d-flex gap-2 flex-wrap">
                    <button type="button" className="btn btn-cine-mini" onClick={() => cambiarEstado(reserva._id, "confirmed")}>
                      Confirmar
                    </button>
                    <button type="button" className="btn btn-cine-mini btn-cine-mini--danger" onClick={() => cambiarEstado(reserva._id, "cancelled")}>
                      Cancelar
                    </button>
                    <button type="button" className="btn btn-cine-mini" onClick={() => abrirEdicion(reserva)}>
                      Editar
                    </button>
                    <button type="button" className="btn btn-cine-mini btn-cine-mini--danger" onClick={() => borrarReserva(reserva._id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-lg-none admin-movil-lista">
        {reservas.map((reserva) => (
          <article className="admin-reserva-card" key={reserva._id}>
            <div className="admin-reserva-card__cabecera">
              <div>
                <p className="admin-reserva-card__etiqueta mb-1">{reserva.user?.name}</p>
                <h3 className="admin-reserva-card__titulo mb-0">{reserva.date?.slice(0, 10)}</h3>
              </div>
              <span className="estado-cine estado-cine--ok">{reserva.status}</span>
            </div>

            <div className="admin-reserva-card__datos">
              <span>Hora: {reserva.time}</span>
              <span>Area: {reserva.area}</span>
              <span>Personas: {reserva.people}</span>
            </div>

            <div className="admin-reserva-card__acciones">
              <button type="button" className="btn btn-cine-mini" onClick={() => cambiarEstado(reserva._id, "confirmed")}>
                Confirmar
              </button>
              <button type="button" className="btn btn-cine-mini btn-cine-mini--danger" onClick={() => cambiarEstado(reserva._id, "cancelled")}>
                Cancelar
              </button>
              <button type="button" className="btn btn-cine-mini" onClick={() => abrirEdicion(reserva)}>
                Editar
              </button>
              <button type="button" className="btn btn-cine-mini btn-cine-mini--danger" onClick={() => borrarReserva(reserva._id)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
