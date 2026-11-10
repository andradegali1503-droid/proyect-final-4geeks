import { useEffect, useMemo, useRef, useState } from "react";
import {
  actualizarReservaAdmin,
  cambiarEstadoReserva,
  eliminarReservaAdmin,
  obtenerTodasLasReservas
} from "../services/reservationService";
import {
  LayoutGrid,
  ListOrdered,
  Users,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit3,
  Trash2,
  UserCheck,
  Calendar,
  Utensils,
  MapPin,
  RefreshCw,
  Search
} from "lucide-react";

const formularioInicial = {
  date: "",
  time: "",
  people: 2,
  area: "indoor",
  status: "pending"
};

const formatearFechaLocal = (valorFecha) => {
  const fecha = new Date(valorFecha);
  if (Number.isNaN(fecha.getTime())) return "";
  return fecha.toISOString().slice(0, 10);
};

// Configuración de Mesas del Restaurante 5 Estrellas
const MESAS_SALON = [
  { id: "M1", nombre: "Mesa 1 • Ventanal", capacidad: 2, zona: "indoor" },
  { id: "M2", nombre: "Mesa 2 • Rincón Íntimo", capacidad: 2, zona: "indoor" },
  { id: "M3", nombre: "Mesa 3 • Central", capacidad: 4, zona: "indoor" },
  { id: "M4", nombre: "Mesa 4 • Central", capacidad: 4, zona: "indoor" },
  { id: "M5", nombre: "Mesa 5 • Salón Imperial", capacidad: 6, zona: "indoor" },
  { id: "M6", nombre: "Mesa 6 • Salón Imperial", capacidad: 8, zona: "indoor" }
];

const MESAS_TERRAZA = [
  { id: "T1", nombre: "Terraza 1 • Jardín", capacidad: 2, zona: "terrace" },
  { id: "T2", nombre: "Terraza 2 • Pérgola", capacidad: 4, zona: "terrace" },
  { id: "T3", nombre: "Terraza 3 • Mirador", capacidad: 4, zona: "terrace" }
];

const MESAS_CHEF = [
  { id: "C1", nombre: "Chef's Table Privée", capacidad: 6, zona: "indoor", vip: true }
];

function AdminDashboard() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [reservaEditando, setReservaEditando] = useState("");
  const [formulario, setFormulario] = useState(formularioInicial);
  const referenciaFormulario = useRef(null);

  // Estados de control del Maître d'
  const hoyString = new Date().toISOString().slice(0, 10);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(hoyString);
  const [turnoActivo, setTurnoActivo] = useState("todos"); // 'almuerzo', 'cena', 'todos'
  const [pestanaActiva, setPestanaActiva] = useState("plano"); // 'plano', 'lista', 'espera'
  const [busquedaTexto, setBusquedaTexto] = useState("");
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  const cargarReservas = async () => {
    try {
      const data = await obtenerTodasLasReservas();
      setReservas(data || []);
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
      setMensaje("Reserva actualizada con éxito");
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
      setMensaje(`Estado actualizado a: ${status}`);
      cargarReservas();
    } catch (error) {
      console.error("Error al actualizar el estado de la reserva:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo actualizar el estado");
    }
  };

  const borrarReserva = async (idReserva) => {
    const confirmar = window.confirm("¿Seguro que desea cancelar definitivamente esta reserva de alta gama?");
    if (!confirmar) return;

    setMensaje("");
    setMensajeError("");

    try {
      await eliminarReservaAdmin(idReserva);
      setMensaje("Reserva eliminada del sistema");
      if (reservaEditando === idReserva) {
        limpiarFormulario();
      }
      cargarReservas();
    } catch (error) {
      console.error("Error al eliminar la reserva:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo eliminar la reserva");
    }
  };

  // Filtrado operativo de reservas por fecha, turno y búsqueda
  const reservasFiltradas = useMemo(() => {
    return reservas.filter((r) => {
      const fechaReserva = r.date ? formatearFechaLocal(r.date) : "";
      const coincideFecha = !fechaSeleccionada || fechaReserva === fechaSeleccionada;

      let coincideTurno = true;
      if (turnoActivo === "almuerzo") {
        const horaNum = parseInt(r.time?.slice(0, 2) || "0", 10);
        coincideTurno = horaNum >= 12 && horaNum < 18;
      } else if (turnoActivo === "cena") {
        const horaNum = parseInt(r.time?.slice(0, 2) || "0", 10);
        coincideTurno = horaNum >= 18 || horaNum < 4;
      }

      const clienteNombre = (r.user?.name || "").toLowerCase();
      const coincideBusqueda = !busquedaTexto || clienteNombre.includes(busquedaTexto.toLowerCase());

      return coincideFecha && coincideTurno && coincideBusqueda;
    });
  }, [reservas, fechaSeleccionada, turnoActivo, busquedaTexto]);

  // Métricas del servicio activo
  const metricas = useMemo(() => {
    const total = reservasFiltradas.length;
    const confirmadas = reservasFiltradas.filter((r) => r.status === "confirmed").length;
    const pendientes = reservasFiltradas.filter((r) => r.status === "pending").length;
    const canceladas = reservasFiltradas.filter((r) => r.status === "cancelled").length;
    const comensalesTotales = reservasFiltradas
      .filter((r) => r.status !== "cancelled")
      .reduce((acc, curr) => acc + (Number(curr.people) || 0), 0);

    return { total, confirmadas, pendientes, canceladas, comensalesTotales };
  }, [reservasFiltradas]);

  // Mapeo de ocupación simulado/sincronizado para el Floorplan
  const mapaMesasOcupadas = useMemo(() => {
    const mapa = {};
    reservasFiltradas.forEach((res, index) => {
      if (res.status === "cancelled") return;
      // Asignación de mesa según zona e índice
      let mesaId = "";
      if (res.area === "terrace") {
        mesaId = MESAS_TERRAZA[index % MESAS_TERRAZA.length]?.id;
      } else {
        mesaId = index === 0 ? "C1" : MESAS_SALON[(index - 1) % MESAS_SALON.length]?.id;
      }
      if (mesaId && !mapa[mesaId]) {
        mapa[mesaId] = res;
      }
    });
    return mapa;
  }, [reservasFiltradas]);

  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning mb-3" role="status"></div>
        <p className="text-white-50">Sincronizando la Consola del Maître d'...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 px-md-5">
      {/* Barra Superior del Maître d' */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 border-bottom pb-4" style={{ borderColor: "rgba(200, 162, 106, 0.2) !important" }}>
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge-atelier-gold">
              <Sparkles size={12} className="text-warning" /> Consola de Maître d' & Host
            </span>
            <span className="text-white-50 small">• L'Atelier Noir</span>
          </div>
          <h1 className="h3 text-white font-serif mb-0">Control de Sala & Reservas</h1>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-3">
          {/* Selector de Fecha */}
          <div className="d-flex align-items-center gap-2 bg-dark px-3 py-1 rounded border border-secondary">
            <Calendar size={15} className="text-warning" />
            <input
              type="date"
              className="bg-transparent text-white border-0 small"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
            />
            {fechaSeleccionada && (
              <button
                className="btn btn-sm btn-link text-white-50 p-0 text-decoration-none"
                onClick={() => setFechaSeleccionada("")}
                title="Ver todas las fechas"
              >
                ✕
              </button>
            )}
          </div>

          <button className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1" onClick={cargarReservas}>
            <RefreshCw size={14} /> Actualizar
          </button>
        </div>
      </div>

      {/* Alertas de Notificación */}
      {mensaje && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-3 border-0 text-white" style={{ background: "rgba(46, 125, 50, 0.25)", border: "1px solid rgba(76, 175, 80, 0.4)" }}>
          <CheckCircle size={16} className="text-success" />
          <span>{mensaje}</span>
        </div>
      )}
      {mensajeError && (
        <div className="alert alert-danger d-flex align-items-center gap-2 mb-3 border-0 text-white" style={{ background: "rgba(198, 40, 40, 0.25)", border: "1px solid rgba(239, 83, 80, 0.4)" }}>
          <AlertTriangle size={16} className="text-danger" />
          <span>{mensajeError}</span>
        </div>
      )}

      {/* Tarjetas de Métricas en Tiempo Real */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card tarjeta-suave p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-white-50 small text-uppercase" style={{ letterSpacing: "0.1em" }}>Comensales</span>
              <Users size={18} className="text-warning" />
            </div>
            <div className="fs-3 fw-bold text-white">{metricas.comensalesTotales}</div>
            <span className="text-white-50 small">Previstos en el servicio</span>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card tarjeta-suave p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-white-50 small text-uppercase" style={{ letterSpacing: "0.1em" }}>Confirmadas</span>
              <CheckCircle size={18} className="text-success" />
            </div>
            <div className="fs-3 fw-bold text-success">{metricas.confirmadas}</div>
            <span className="text-white-50 small">Mesas aseguradas</span>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card tarjeta-suave p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-white-50 small text-uppercase" style={{ letterSpacing: "0.1em" }}>Pendientes</span>
              <Clock size={18} className="text-warning" />
            </div>
            <div className="fs-3 fw-bold text-warning">{metricas.pendientes}</div>
            <span className="text-white-50 small">Por verificar / llamar</span>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card tarjeta-suave p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-white-50 small text-uppercase" style={{ letterSpacing: "0.1em" }}>Canceladas</span>
              <XCircle size={18} className="text-danger" />
            </div>
            <div className="fs-3 fw-bold text-danger">{metricas.canceladas}</div>
            <span className="text-white-50 small">Mesa liberada</span>
          </div>
        </div>
      </div>

      {/* Selector de Turnos y Pestañas Operativas */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        {/* Turnos */}
        <div className="d-flex gap-2">
          <button
            className={`shift-pill ${turnoActivo === "todos" ? "shift-pill--active" : ""}`}
            onClick={() => setTurnoActivo("todos")}
          >
            Día Completo
          </button>
          <button
            className={`shift-pill ${turnoActivo === "almuerzo" ? "shift-pill--active" : ""}`}
            onClick={() => setTurnoActivo("almuerzo")}
          >
            Déjeuner (13:00 - 16:30)
          </button>
          <button
            className={`shift-pill ${turnoActivo === "cena" ? "shift-pill--active" : ""}`}
            onClick={() => setTurnoActivo("cena")}
          >
            Dîner (20:00 - 23:30)
          </button>
        </div>

        {/* Selector de Pestañas: Plano de Sala vs Lista de Reservas */}
        <div className="btn-group bg-dark p-1 rounded border border-secondary" role="group">
          <button
            type="button"
            className={`btn btn-sm ${pestanaActiva === "plano" ? "btn-warning text-dark fw-medium" : "btn-dark text-white-50"}`}
            onClick={() => setPestanaActiva("plano")}
          >
            <LayoutGrid size={15} className="me-1" /> Plano de Sala
          </button>
          <button
            type="button"
            className={`btn btn-sm ${pestanaActiva === "lista" ? "btn-warning text-dark fw-medium" : "btn-dark text-white-50"}`}
            onClick={() => setPestanaActiva("lista")}
          >
            <ListOrdered size={15} className="me-1" /> Lista de Reservas
          </button>
        </div>
      </div>

      {/* Editor Modal de Reserva (si se está editando una) */}
      {reservaEditando && (
        <section className="card tarjeta-suave mb-4 border-warning" ref={referenciaFormulario}>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span className="badge-atelier-gold mb-1">Modificación de Huésped VIP</span>
                <h4 className="text-white font-serif mb-0">Editar Coordenadas de Reserva</h4>
              </div>
              <button className="btn btn-sm btn-outline-light" onClick={limpiarFormulario}>
                ✕ Cerrar
              </button>
            </div>

            <form onSubmit={guardarCambios}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label text-white-50 small">Fecha</label>
                  <input className="form-control bg-dark text-white border-secondary" name="date" type="date" value={formulario.date} onChange={manejarCambio} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label text-white-50 small">Hora</label>
                  <input className="form-control bg-dark text-white border-secondary" name="time" type="time" value={formulario.time} onChange={manejarCambio} required />
                </div>
                <div className="col-md-2">
                  <label className="form-label text-white-50 small">Personas</label>
                  <input className="form-control bg-dark text-white border-secondary" name="people" type="number" min="1" max="12" value={formulario.people} onChange={manejarCambio} required />
                </div>
                <div className="col-md-2">
                  <label className="form-label text-white-50 small">Área</label>
                  <select className="form-select bg-dark text-white border-secondary" name="area" value={formulario.area} onChange={manejarCambio}>
                    <option value="indoor">indoor (Salón)</option>
                    <option value="terrace">terrace (L'Orangerie)</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label text-white-50 small">Estado</label>
                  <select className="form-select bg-dark text-white border-secondary" name="status" value={formulario.status} onChange={manejarCambio}>
                    <option value="pending">pending (Pendiente)</option>
                    <option value="confirmed">confirmed (Confirmada)</option>
                    <option value="cancelled">cancelled (Cancelada)</option>
                  </select>
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-warning fw-medium text-dark" type="submit">
                  Guardar cambios
                </button>
                <button className="btn btn-outline-secondary text-white" type="button" onClick={limpiarFormulario}>
                  Cancelar edición
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* PESTAÑA 1: PLANO DE SALA INTERACTIVO (FLOORPLAN DE MAÎTRE D') */}
      {pestanaActiva === "plano" && (
        <div className="row g-4 mb-4">
          <div className="col-lg-8">
            {/* Chef's Table VIP */}
            <div className="floorplan-zone mb-3" style={{ borderLeft: "4px solid #c5a059" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="text-warning font-serif mb-0 d-flex align-items-center gap-2">
                  <Sparkles size={16} /> Chef's Table Privée (Cocina en Directo)
                </h6>
                <span className="text-white-50 small">1 Mesa VIP • 6 comensales</span>
              </div>
              <div className="floorplan-grid">
                {MESAS_CHEF.map((mesa) => {
                  const res = mapaMesasOcupadas[mesa.id];
                  const ocupada = Boolean(res);
                  return (
                    <div
                      key={mesa.id}
                      className={`table-node ${ocupada ? "table-node--occupied" : "table-node--available"} ${mesaSeleccionada?.id === mesa.id ? "table-node--selected" : ""}`}
                      onClick={() => setMesaSeleccionada({ ...mesa, reserva: res })}
                    >
                      <Utensils size={16} className={ocupada ? "text-warning mb-1" : "text-success mb-1"} />
                      <div className="text-white fw-bold small">{mesa.id}</div>
                      <div className="text-white-50 small" style={{ fontSize: "0.7rem" }}>Máx {mesa.capacidad}p</div>
                      <span className={`table-node__badge ${ocupada ? "table-node__badge--occupied" : "table-node__badge--available"}`}>
                        {ocupada ? res.user?.name || "Asignada" : "Disponible"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Le Grand Salon Principal */}
            <div className="floorplan-zone mb-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="text-white font-serif mb-0 d-flex align-items-center gap-2">
                  <MapPin size={16} className="text-warning" /> Le Grand Salon (Sala Principal)
                </h6>
                <span className="text-white-50 small">6 Mesas • Luz íntima</span>
              </div>
              <div className="floorplan-grid">
                {MESAS_SALON.map((mesa) => {
                  const res = mapaMesasOcupadas[mesa.id];
                  const ocupada = Boolean(res);
                  return (
                    <div
                      key={mesa.id}
                      className={`table-node ${ocupada ? "table-node--occupied" : "table-node--available"} ${mesaSeleccionada?.id === mesa.id ? "table-node--selected" : ""}`}
                      onClick={() => setMesaSeleccionada({ ...mesa, reserva: res })}
                    >
                      <Users size={16} className={ocupada ? "text-warning mb-1" : "text-success mb-1"} />
                      <div className="text-white fw-bold small">{mesa.id}</div>
                      <div className="text-white-50 small" style={{ fontSize: "0.7rem" }}>{mesa.capacidad} personas</div>
                      <span className={`table-node__badge ${ocupada ? "table-node__badge--occupied" : "table-node__badge--available"}`}>
                        {ocupada ? (res.user?.name ? res.user.name.split(" ")[0] : "Ocupada") : "Libre"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* L'Orangerie (Terraza) */}
            <div className="floorplan-zone">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="text-white font-serif mb-0 d-flex align-items-center gap-2">
                  <MapPin size={16} className="text-info" /> L'Orangerie (Terraza Acristalada)
                </h6>
                <span className="text-white-50 small">3 Mesas • Climatizadas</span>
              </div>
              <div className="floorplan-grid">
                {MESAS_TERRAZA.map((mesa) => {
                  const res = mapaMesasOcupadas[mesa.id];
                  const ocupada = Boolean(res);
                  return (
                    <div
                      key={mesa.id}
                      className={`table-node ${ocupada ? "table-node--occupied" : "table-node--available"} ${mesaSeleccionada?.id === mesa.id ? "table-node--selected" : ""}`}
                      onClick={() => setMesaSeleccionada({ ...mesa, reserva: res })}
                    >
                      <Users size={16} className={ocupada ? "text-warning mb-1" : "text-success mb-1"} />
                      <div className="text-white fw-bold small">{mesa.id}</div>
                      <div className="text-white-50 small" style={{ fontSize: "0.7rem" }}>{mesa.capacidad} personas</div>
                      <span className={`table-node__badge ${ocupada ? "table-node__badge--occupied" : "table-node__badge--available"}`}>
                        {ocupada ? (res.user?.name ? res.user.name.split(" ")[0] : "Ocupada") : "Libre"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Panel Lateral de Ficha de Mesa / Huésped */}
          <div className="col-lg-4">
            <div className="card tarjeta-suave p-4 h-100">
              <span className="badge-atelier-gold mb-2">Detalle Operativo de Mesa</span>
              {mesaSeleccionada ? (
                <div>
                  <h4 className="text-white font-serif mb-1">{mesaSeleccionada.nombre}</h4>
                  <p className="text-white-50 small mb-3">Capacidad máxima: {mesaSeleccionada.capacidad} comensales</p>

                  {mesaSeleccionada.reserva ? (
                    <div className="p-3 rounded mb-3" style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(200, 162, 106, 0.3)" }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-warning small fw-bold">Huésped Asignado</span>
                        <span className="badge bg-secondary">{mesaSeleccionada.reserva.status}</span>
                      </div>
                      <div className="text-white fw-semibold mb-1">{mesaSeleccionada.reserva.user?.name || "Huésped"}</div>
                      <div className="text-white-50 small mb-2">{mesaSeleccionada.reserva.user?.email || "Sin email"}</div>
                      <div className="text-white small">
                        <strong>Hora:</strong> {mesaSeleccionada.reserva.time} h • {mesaSeleccionada.reserva.people} personas
                      </div>

                      <div className="d-flex gap-2 mt-3">
                        <button
                          className="btn btn-sm btn-outline-warning w-100"
                          onClick={() => abrirEdicion(mesaSeleccionada.reserva)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-success w-100"
                          onClick={() => cambiarEstado(mesaSeleccionada.reserva._id, "confirmed")}
                        >
                          Check-in
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 text-center rounded text-white-50 small" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
                      Mesa libre en este turno. Lista para asignación.
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-5 text-white-50">
                  <LayoutGrid size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="small mb-0">Seleccione cualquier mesa del plano para ver su estado y comensales asignados.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 2: LISTA DE RESERVAS DETALLADA (TABLA DE ALTA PRECISIÓN) */}
      {pestanaActiva === "lista" && (
        <div className="card tarjeta-suave">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h5 className="text-white font-serif mb-0">Libro Diario de Reservas ({reservasFiltradas.length})</h5>
              <div className="d-flex align-items-center gap-2 bg-dark px-3 py-1 rounded border border-secondary" style={{ maxWidth: "280px" }}>
                <Search size={14} className="text-white-50" />
                <input
                  type="text"
                  placeholder="Buscar por cliente..."
                  className="bg-transparent text-white border-0 small w-100"
                  value={busquedaTexto}
                  onChange={(e) => setBusquedaTexto(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-borderless align-middle mb-0">
                <thead>
                  <tr className="border-bottom border-secondary text-white-50 small text-uppercase" style={{ letterSpacing: "0.08em" }}>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Área</th>
                    <th>Personas</th>
                    <th>Estado</th>
                    <th className="text-end">Acciones de Sala</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-white-50">
                        No hay reservas registradas para esta selección.
                      </td>
                    </tr>
                  ) : (
                    reservasFiltradas.map((reserva) => (
                      <tr key={reserva._id} className="border-bottom" style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}>
                        <td>
                          <div className="text-white fw-semibold">{reserva.user?.name || "Cliente"}</div>
                          <div className="text-white-50 small" style={{ fontSize: "0.75rem" }}>{reserva.user?.email}</div>
                        </td>
                        <td>{reserva.date ? formatearFechaLocal(reserva.date) : "—"}</td>
                        <td>
                          <span className="badge bg-dark border border-secondary text-warning font-monospace">
                            {reserva.time || "—"}
                          </span>
                        </td>
                        <td>
                          <span className={`small ${reserva.area === "terrace" ? "text-info" : "text-white-50"}`}>
                            {reserva.area === "terrace" ? "Terraza (L'Orangerie)" : "Salón Principal"}
                          </span>
                        </td>
                        <td>
                          <span className="text-white fw-medium">{reserva.people}</span> <span className="text-white-50 small">comensales</span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              reserva.status === "confirmed"
                                ? "bg-success"
                                : reserva.status === "cancelled"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {reserva.status}
                          </span>
                        </td>
                        <td className="text-end">
                          <div className="d-inline-flex gap-1">
                            {reserva.status !== "confirmed" && (
                              <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() => cambiarEstado(reserva._id, "confirmed")}
                                title="Confirmar reserva"
                              >
                                <UserCheck size={14} />
                              </button>
                            )}
                            {reserva.status !== "cancelled" && (
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => cambiarEstado(reserva._id, "cancelled")}
                                title="Cancelar reserva"
                              >
                                <XCircle size={14} />
                              </button>
                            )}
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => abrirEdicion(reserva)}
                              title="Editar detalles"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => borrarReserva(reserva._id)}
                              title="Eliminar registro"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
