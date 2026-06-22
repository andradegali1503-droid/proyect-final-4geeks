import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { enviarEmailConfirmacion, obtenerVariablesEmailjsFaltantes } from "../services/emailService";
import { crearReserva } from "../services/reservationService";
import { etiquetaClima, obtenerClimaReserva } from "../services/weatherService";

function Reserve() {
  const { usuario } = useAuth();
  const fechaMinima = new Date().toISOString().slice(0, 10);
  const [datosFormulario, setDatosFormulario] = useState({
    date: "",
    time: "",
    people: 2,
    area: "indoor"
  });
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

      try {
        const respuestaEmail = await enviarEmailConfirmacion({
          name: usuario?.name || "Cliente",
          email: usuario?.email || "",
          subject: "Confirmacion de reserva MesaClick",
          message: `Reserva para ${datosFormulario.date} a las ${datosFormulario.time} para ${datosFormulario.people} personas en ${datosFormulario.area}`,
          to_name: usuario?.name || "Cliente",
          to_email: usuario?.email || "",
          from_name: "MesaClick",
          reply_to: "noreply@mesaclick.com",
          restaurant_name: "MesaClick",
          reservation_date: datosFormulario.date,
          reservation_time: datosFormulario.time,
          reservation_people: datosFormulario.people,
          reservation_area: datosFormulario.area,
          weather_summary: climaReserva
            ? `${climaReserva.descripcion}, ${climaReserva.temperaturaMinima}C - ${climaReserva.temperaturaMaxima}C, lluvia ${climaReserva.probabilidadLluvia}%`
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
      setDatosFormulario({
        date: "",
        time: "",
        people: 2,
        area: "indoor"
      });
    } catch (error) {
      console.error("Error al crear la reserva:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo crear la reserva");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-7">
        <div className="card tarjeta-suave">
          <div className="card-body p-4">
            <h1 className="titulo-seccion">Reservar mesa</h1>

            {mensaje && <div className="alert alert-success">{mensaje}</div>}
            {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
            {avisoEmail && <div className="alert alert-warning">{avisoEmail}</div>}
            {variablesEmailjsFaltantes.length > 0 && (
              <div className="alert alert-secondary">
                EmailJS no esta configurado. Variables pendientes: {variablesEmailjsFaltantes.join(", ")}
              </div>
            )}

            <form onSubmit={enviarFormulario}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="date">
                    Fecha
                  </label>
                  <input
                    id="date"
                    className="form-control"
                    type="date"
                    name="date"
                    min={fechaMinima}
                    value={datosFormulario.date}
                    onChange={cambiarInput}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="time">
                    Hora
                  </label>
                  <input
                    id="time"
                    className="form-control"
                    type="time"
                    name="time"
                    value={datosFormulario.time}
                    onChange={cambiarInput}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="people">
                    Personas
                  </label>
                  <input
                    id="people"
                    className="form-control"
                    type="number"
                    name="people"
                    min="1"
                    max="12"
                    value={datosFormulario.people}
                    onChange={cambiarInput}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="area">
                    Area
                  </label>
                  <select
                    id="area"
                    className="form-select"
                    name="area"
                    value={datosFormulario.area}
                    onChange={cambiarInput}
                  >
                    <option value="indoor">indoor</option>
                    <option value="terrace">terrace</option>
                  </select>
                </div>
              </div>

              <button className="btn btn-dark mt-4" type="submit">
                Crear reserva
              </button>
            </form>

            {datosFormulario.area === "terrace" && datosFormulario.date && (
              <div className="alert alert-info mt-4 mb-0">
                {cargandoClima ? (
                  <p className="mb-0">Consultando clima para la terraza...</p>
                ) : climaReserva ? (
                  <div>
                    <strong>
                      Clima estimado para {etiquetaClima} - {climaReserva.fecha}
                    </strong>
                    <p className="mb-1">{climaReserva.descripcion}</p>
                    <p className="mb-0">
                      Min {climaReserva.temperaturaMinima}C | Max {climaReserva.temperaturaMaxima}C | Lluvia {climaReserva.probabilidadLluvia}%
                    </p>
                  </div>
                ) : (
                  <p className="mb-0">No se pudo cargar el clima para esa fecha.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reserve;
