import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { enviarEmailConfirmacion, obtenerVariablesEmailjsFaltantes } from "../services/emailService";
import { crearReserva } from "../services/reservationService";
import { etiquetaClima, obtenerClimaReserva } from "../services/weatherService";
import {
  Calendar,
  Clock,
  Users,
  Compass,
  UtensilsCrossed,
  Sparkles,
  ShieldAlert,
  Info,
  CheckCircle2,
  Printer,
  HeartHandshake,
  Wine,
  Sun,
  Moon,
  ChevronRight
} from "lucide-react";

const EXPERIENCIAS = [
  {
    id: "degustation",
    nombre: "Grand Menu Dégustation",
    subtitulo: "10 pases de alta cocina de autor",
    descripcion: "Un recorrido sensorial por la estacionalidad y el producto de terruño más selecto.",
    precio: "195 € / comensal"
  },
  {
    id: "chef-table",
    nombre: "L'Expérience Chef's Table",
    subtitulo: "Servicio exclusivo frente a cocina",
    descripcion: "Mesa interactiva con el Chef Ejecutivo y maridaje de bodegas privadas.",
    precio: "280 € / comensal"
  },
  {
    id: "estacional",
    nombre: "Menu Terroir Contemporain",
    subtitulo: "6 pases de cocina de mercado",
    descripcion: "Equilibrio entre tradición culinaria francesa y técnicas de vanguardia.",
    precio: "145 € / comensal"
  }
];

const LISTA_ALERGENOS = [
  "Gluten / Celiaquía",
  "Frutos secos",
  "Mariscos / Moluscos",
  "Lácteos / Lactosa",
  "Embarazo (ingredientes seguros)",
  "Pescado",
  "Opción Vegetariana",
  "Opción Vegana"
];

const OCASIONES = [
  "Cena de cortesía / Placer gastronómico",
  "Aniversario o velada romántica",
  "Reunión de negocios o protocolo",
  "Celebración privada o cumpleaños"
];

const HORARIOS_ALMUERZO = ["13:30", "14:00", "14:30", "15:00"];
const HORARIOS_CENA = ["20:30", "21:00", "21:30", "22:00"];

function Reserve() {
  const { usuario } = useAuth();
  const fechaMinima = new Date().toISOString().slice(0, 10);
  const [datosFormulario, setDatosFormulario] = useState({
    date: "",
    time: "",
    people: 2,
    area: "indoor"
  });

  // Campos de experiencia cinco estrellas
  const [experienciaSeleccionada, setExperienciaSeleccionada] = useState("degustation");
  const [ocasionSeleccionada, setOcasionSeleccionada] = useState(OCASIONES[0]);
  const [alergenosSeleccionados, setAlergenosSeleccionados] = useState([]);
  const [solicitudesEspeciales, setSolicitudesEspeciales] = useState("");
  const [paseConfirmado, setPaseConfirmado] = useState(null);

  const [mensaje, setMensaje] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [avisoEmail, setAvisoEmail] = useState("");
  const [climaReserva, setClimaReserva] = useState(null);
  const [cargandoClima, setCargandoClima] = useState(false);
  const variablesEmailjsFaltantes = obtenerVariablesEmailjsFaltantes();

  const cambiarInput = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value
    });
  };

  const seleccionarHorarioRapido = (hora) => {
    setDatosFormulario((prev) => ({
      ...prev,
      time: hora
    }));
  };

  const toggleAlergeno = (alergeno) => {
    setAlergenosSeleccionados((prev) =>
      prev.includes(alergeno) ? prev.filter((item) => item !== alergeno) : [...prev, alergeno]
    );
  };

  useEffect(() => {
    const consultarClima = async () => {
      if (!datosFormulario.date || datosFormulario.area !== "terrace") {
        setClimaReserva(null);
        return;
      }

      setCargandoClima(true);

      try {
        const clima = await obtenerClimaReserva(datosFormulario.date);
        setClimaReserva(clima);
      } catch (error) {
        console.error("Error al cargar el clima:", error.message);
        setClimaReserva(null);
      } finally {
        setCargandoClima(false);
      }
    };

    consultarClima();
  }, [datosFormulario.date, datosFormulario.area]);

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setMensaje("");
    setMensajeError("");
    setAvisoEmail("");

    try {
      const reservaCreada = await crearReserva(datosFormulario);

      const codigoReserva = `ATELIER-${Math.floor(100000 + Math.random() * 900000)}`;

      try {
        const respuestaEmail = await enviarEmailConfirmacion({
          name: usuario?.name || "Huésped Distinguido",
          email: usuario?.email || "",
          subject: `Confirmación de Reserva • L'Atelier Noir (${codigoReserva})`,
          message: `Su reserva para el ${datosFormulario.date} a las ${datosFormulario.time} h para ${datosFormulario.people} personas en ${datosFormulario.area === "terrace" ? "L'Orangerie (Terraza)" : "Le Grand Salon"} ha sido registrada. Experiencia: ${EXPERIENCIAS.find((exp) => exp.id === experienciaSeleccionada)?.nombre || "Menú Gastronómico"}.`,
          to_name: usuario?.name || "Huésped Distinguido",
          to_email: usuario?.email || "",
          from_name: "L'Atelier Noir Concierge",
          reply_to: "concierge@latelier-noir.com",
          restaurant_name: "L'Atelier Noir",
          reservation_date: datosFormulario.date,
          reservation_time: datosFormulario.time,
          reservation_people: datosFormulario.people,
          reservation_area: datosFormulario.area,
          weather_summary: climaReserva
            ? `${climaReserva.descripcion}, ${climaReserva.temperaturaMinima}°C - ${climaReserva.temperaturaMaxima}°C, lluvia ${climaReserva.probabilidadLluvia}%`
            : "No disponible"
        });

        if (!respuestaEmail.ok) {
          const detalleEstado = respuestaEmail.status ? ` (status ${respuestaEmail.status})` : "";
          setAvisoEmail(`EmailJS no envio el correo: ${respuestaEmail.motivo}${detalleEstado}`);
          console.warn("EmailJS no envio el correo:", respuestaEmail);
        }
      } catch (errorEmail) {
        console.error("Error al enviar el email:", errorEmail);
        setAvisoEmail(`La reserva se creo, pero no se pudo enviar el email: ${errorEmail?.message || "error desconocido"}`);
      }

      setMensaje(`Reserva creada correctamente${reservaCreada?.status ? ` (${reservaCreada.status})` : ""}`);

      setPaseConfirmado({
        codigo: codigoReserva,
        fecha: datosFormulario.date,
        hora: datosFormulario.time,
        personas: datosFormulario.people,
        area: datosFormulario.area === "terrace" ? "L'Orangerie (Terraza Acristalada)" : "Le Grand Salon (Salón Principal)",
        experiencia: EXPERIENCIAS.find((e) => e.id === experienciaSeleccionada)?.nombre,
        huesped: usuario?.name || "Huésped Principal",
        email: usuario?.email || "",
        ocasion: ocasionSeleccionada,
        alergenos: alergenosSeleccionados
      });

      setDatosFormulario({
        date: "",
        time: "",
        people: 2,
        area: "indoor"
      });
      setAlergenosSeleccionados([]);
      setSolicitudesEspeciales("");
    } catch (error) {
      console.error("Error al crear la reserva:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo crear la reserva");
    }
  };

  const expActual = EXPERIENCIAS.find((e) => e.id === experienciaSeleccionada);

  return (
    <div className="container py-4">
      {/* Encabezado Editorial de Lujo */}
      <div className="text-center mb-5">
        <div className="d-inline-flex justify-content-center mb-2">
          <span className="badge-atelier-gold">
            <Sparkles size={13} className="text-warning" /> Concierge de Alta Hospitalidad
          </span>
        </div>
        <h1 className="display-5 text-white fw-light font-serif mb-2" style={{ letterSpacing: "0.02em" }}>
          Reserva de Mesa
        </h1>
        <p className="text-white-50 mx-auto" style={{ maxWidth: "620px", fontSize: "0.95rem", lineHeight: "1.7" }}>
          Una ceremonia gastronómica diseñada para los paladares más exigentes. Le invitamos a seleccionar su experiencia y horario preferido.
        </p>

        {/* Indicador de 4 Pasos Intuitivos (UX Simplification) */}
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4 text-white-50 small flex-wrap">
          <span className="badge px-3 py-1 bg-warning text-dark fw-semibold rounded-pill">1. Experiencia</span>
          <ChevronRight size={14} className="opacity-50" />
          <span className="badge px-3 py-1 bg-dark text-warning border border-secondary rounded-pill">2. Coordenadas</span>
          <ChevronRight size={14} className="opacity-50" />
          <span className="badge px-3 py-1 bg-dark text-white-50 border border-secondary rounded-pill">3. Alérgenos</span>
          <ChevronRight size={14} className="opacity-50" />
          <span className="badge px-3 py-1 bg-dark text-white-50 border border-secondary rounded-pill">4. Confirmación VIP</span>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-9">
          {/* Mensajes de Alerta y Estado */}
          {mensaje && (
            <div className="alert alert-success d-flex align-items-center gap-2 mb-4 border-0 text-white" style={{ background: "rgba(46, 125, 50, 0.25)", border: "1px solid rgba(76, 175, 80, 0.4)" }}>
              <CheckCircle2 size={18} className="text-success" />
              <span>{mensaje}</span>
            </div>
          )}
          {mensajeError && (
            <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 border-0 text-white" style={{ background: "rgba(198, 40, 40, 0.25)", border: "1px solid rgba(239, 83, 80, 0.4)" }}>
              <ShieldAlert size={18} className="text-danger" />
              <span>{mensajeError}</span>
            </div>
          )}
          {avisoEmail && <div className="alert alert-warning mb-4">{avisoEmail}</div>}
          {variablesEmailjsFaltantes.length > 0 && (
            <div className="alert alert-secondary d-flex align-items-center gap-2 mb-4 text-white-50" style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <Info size={16} />
              <span>Modo Demostración de Correo: Variables EmailJS pendientes: {variablesEmailjsFaltantes.join(", ")}</span>
            </div>
          )}

          {/* Tarjeta de Confirmación - Pase de Huésped Digital */}
          {paseConfirmado && (
            <div className="guest-pass mb-5">
              <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
                <div>
                  <span className="badge-atelier-gold mb-2">Reserva Confirmada • Pase de Huésped VIP</span>
                  <h3 className="text-white font-serif mb-1">L'Atelier Noir — Haute Cuisine</h3>
                  <p className="text-white-50 small mb-0">Presente este código a su llegada con el Maître d' de sala</p>
                </div>
                <div className="text-end">
                  <div className="text-muted small text-uppercase" style={{ letterSpacing: "0.15em" }}>Código Único</div>
                  <div className="fs-3 text-warning fw-bold font-monospace">{paseConfirmado.codigo}</div>
                </div>
              </div>

              <div className="row g-3 py-3 border-top border-bottom" style={{ borderColor: "rgba(200, 162, 106, 0.2) !important" }}>
                <div className="col-sm-3 col-6">
                  <span className="text-white-50 small d-block">Fecha</span>
                  <span className="text-white fw-medium">{paseConfirmado.fecha}</span>
                </div>
                <div className="col-sm-3 col-6">
                  <span className="text-white-50 small d-block">Hora</span>
                  <span className="text-white fw-medium">{paseConfirmado.hora} h</span>
                </div>
                <div className="col-sm-3 col-6">
                  <span className="text-white-50 small d-block">Comensales</span>
                  <span className="text-white fw-medium">{paseConfirmado.personas} personas</span>
                </div>
                <div className="col-sm-3 col-6">
                  <span className="text-white-50 small d-block">Espacio</span>
                  <span className="text-white fw-medium">{paseConfirmado.area}</span>
                </div>
              </div>

              <div className="mt-3 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <span className="text-white-50 small d-block">Experiencia Culinaria:</span>
                  <span className="text-warning small fw-medium">{paseConfirmado.experiencia}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light d-inline-flex align-items-center gap-2"
                  onClick={() => window.print()}
                >
                  <Printer size={14} /> Imprimir Comprobante VIP
                </button>
              </div>
            </div>
          )}

          {/* Formulario Principal de Reserva */}
          <div className="card tarjeta-suave">
            <div className="card-body p-4 p-md-5">
              <form onSubmit={enviarFormulario}>
                {/* 1. Selección de Experiencia Culinaria */}
                <div className="mb-4">
                  <label className="text-white small text-uppercase mb-3 d-flex align-items-center gap-2" style={{ letterSpacing: "0.15em" }}>
                    <UtensilsCrossed size={16} className="text-warning" /> 1. Selección de Experiencia Gastronómica
                  </label>
                  <div className="row g-3">
                    {EXPERIENCIAS.map((exp) => {
                      const activa = experienciaSeleccionada === exp.id;
                      return (
                        <div key={exp.id} className="col-md-4">
                          <div
                            className={`experience-card h-100 ${activa ? "experience-card--active" : ""}`}
                            onClick={() => setExperienciaSeleccionada(exp.id)}
                          >
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <span className="small text-warning fw-semibold">{exp.precio}</span>
                              {activa && <Sparkles size={14} className="text-warning" />}
                            </div>
                            <h6 className="text-white font-serif mb-1">{exp.nombre}</h6>
                            <p className="text-white-50 small mb-0" style={{ fontSize: "0.78rem" }}>
                              {exp.descripcion}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Coordenadas de la Reserva (Inputs obligatorios para el test y el servicio) */}
                <div className="mb-4">
                  <label className="text-white small text-uppercase mb-3 d-flex align-items-center gap-2" style={{ letterSpacing: "0.15em" }}>
                    <Calendar size={16} className="text-warning" /> 2. Fecha, Horario y Comensales
                  </label>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-white-50 small" htmlFor="date">
                        Fecha
                      </label>
                      <input
                        id="date"
                        className="form-control bg-dark text-white border-secondary"
                        type="date"
                        name="date"
                        min={fechaMinima}
                        value={datosFormulario.date}
                        onChange={cambiarInput}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-white-50 small" htmlFor="time">
                        Hora
                      </label>
                      <input
                        id="time"
                        className="form-control bg-dark text-white border-secondary"
                        type="time"
                        name="time"
                        value={datosFormulario.time}
                        onChange={cambiarInput}
                        required
                      />
                      {/* Accesos rápidos de turno */}
                      <div className="d-flex gap-1 flex-wrap mt-2">
                        <span className="text-white-50 small me-1 d-flex align-items-center gap-1" style={{ fontSize: "0.72rem" }}>
                          <Sun size={11} className="text-warning" /> Almuerzo:
                        </span>
                        {HORARIOS_ALMUERZO.map((h) => (
                          <button
                            key={h}
                            type="button"
                            className="badge bg-dark text-white-50 border border-secondary px-2 py-1"
                            onClick={() => seleccionarHorarioRapido(h)}
                            style={{ cursor: "pointer" }}
                          >
                            {h}
                          </button>
                        ))}
                        <span className="text-white-50 small ms-2 me-1 d-flex align-items-center gap-1" style={{ fontSize: "0.72rem" }}>
                          <Moon size={11} className="text-warning" /> Cena:
                        </span>
                        {HORARIOS_CENA.map((h) => (
                          <button
                            key={h}
                            type="button"
                            className="badge bg-dark text-white-50 border border-secondary px-2 py-1"
                            onClick={() => seleccionarHorarioRapido(h)}
                            style={{ cursor: "pointer" }}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-white-50 small" htmlFor="people">
                        Personas
                      </label>
                      <input
                        id="people"
                        className="form-control bg-dark text-white border-secondary"
                        type="number"
                        name="people"
                        min="1"
                        max="12"
                        value={datosFormulario.people}
                        onChange={cambiarInput}
                        required
                      />
                      <span className="form-text text-white-50 small" style={{ fontSize: "0.75rem" }}>
                        Mesas estándar de 1 a 8 comensales. Para grupos mayores, contacte a Concierge.
                      </span>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-white-50 small" htmlFor="area">
                        Area
                      </label>
                      <select
                        id="area"
                        className="form-select bg-dark text-white border-secondary"
                        name="area"
                        value={datosFormulario.area}
                        onChange={cambiarInput}
                      >
                        <option value="indoor">indoor</option>
                        <option value="terrace">terrace</option>
                      </select>
                      <span className="form-text text-white-50 small" style={{ fontSize: "0.75rem" }}>
                        {datosFormulario.area === "terrace"
                          ? "L'Orangerie (Terraza acristalada con previsión climatológica activa)"
                          : "Le Grand Salon (Salón Principal de iluminación íntima)"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sensor de Clima en Directo si se selecciona Terraza */}
                {datosFormulario.area === "terrace" && datosFormulario.date && (
                  <div className="alert alert-info border-0 mb-4 text-white" style={{ background: "rgba(14, 116, 144, 0.25)", border: "1px solid rgba(6, 182, 212, 0.3)" }}>
                    {cargandoClima ? (
                      <p className="mb-0 small">Sincronizando previsión meteorológica para la terraza...</p>
                    ) : climaReserva ? (
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <Compass size={16} className="text-info" />
                          <strong className="small">
                            Previsión Climatológica • {etiquetaClima} ({climaReserva.fecha})
                          </strong>
                        </div>
                        <p className="mb-1 small">{climaReserva.descripcion}</p>
                        <p className="mb-0 small text-white-50">
                          Mínima {climaReserva.temperaturaMinima}°C | Máxima {climaReserva.temperaturaMaxima}°C | Probabilidad de lluvia: {climaReserva.probabilidadLluvia}%
                        </p>
                      </div>
                    ) : (
                      <p className="mb-0 small">No se pudo cargar la previsión meteorológica para esa fecha.</p>
                    )}
                  </div>
                )}

                {/* 3. Protocolo Dietético & Alergias (Esencial para Alta Cocina) */}
                <div className="mb-4">
                  <label className="text-white small text-uppercase mb-2 d-flex align-items-center gap-2" style={{ letterSpacing: "0.15em" }}>
                    <ShieldAlert size={16} className="text-warning" /> 3. Protocolo de Alergias e Intolerancias
                  </label>
                  <p className="text-white-50 small mb-3">
                    La cocina de L'Atelier adapta cada pase con el máximo rigor a sus requerimientos de salud y preferencias:
                  </p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {LISTA_ALERGENOS.map((alergeno) => {
                      const seleccionado = alergenosSeleccionados.includes(alergeno);
                      return (
                        <span
                          key={alergeno}
                          className={`allergen-tag ${seleccionado ? "allergen-tag--selected" : ""}`}
                          onClick={() => toggleAlergeno(alergeno)}
                        >
                          {seleccionado ? "✓ " : "+ "}
                          {alergeno}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Ocasión Especial y Peticiones al Sommelier */}
                <div className="mb-4">
                  <label className="text-white small text-uppercase mb-2 d-flex align-items-center gap-2" style={{ letterSpacing: "0.15em" }}>
                    <Sparkles size={16} className="text-warning" /> 4. Motivo de la Velada y Notas de Servicio
                  </label>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <select
                        className="form-select bg-dark text-white border-secondary small"
                        value={ocasionSeleccionada}
                        onChange={(e) => setOcasionSeleccionada(e.target.value)}
                      >
                        {OCASIONES.map((oca) => (
                          <option key={oca} value={oca}>
                            {oca}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary small"
                        placeholder="Peticiones al sommelier o preferencias de mesa..."
                        value={solicitudesEspeciales}
                        onChange={(e) => setSolicitudesEspeciales(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Resumen de Cortesía de Hospitalidad */}
                <div className="p-3 rounded mb-4" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                  <div className="d-flex align-items-center gap-2 mb-2 text-warning small fw-medium">
                    <HeartHandshake size={15} /> Compromiso de Hospitalidad Cinco Estrellas
                  </div>
                  <ul className="mb-0 text-white-50 small ps-3" style={{ fontSize: "0.8rem", lineHeight: "1.6" }}>
                    <li><strong>Puntualidad:</strong> Su mesa será reservada con 15 minutos de cortesía a partir de la hora acordada.</li>
                    <li><strong>Código de Vestimenta:</strong> *Smart Elegant* (agradecemos evitar indumentaria deportiva y calzado playero).</li>
                    <li><strong>Cancelación Flexible:</strong> Sin penalización avisando con un mínimo de 24 horas previas al servicio.</li>
                  </ul>
                </div>

                {/* Botón de Enviar (conserva text exacto "Crear reserva" para pruebas) */}
                <div className="d-grid gap-2">
                  <button className="btn btn-warning btn-lg fw-semibold text-dark py-3" type="submit" style={{ letterSpacing: "0.05em" }}>
                    Crear reserva
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reserve;
