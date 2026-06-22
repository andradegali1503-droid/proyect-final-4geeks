const latitudReferencia = Number(import.meta.env.VITE_RESTAURANT_LAT || 37.3891);
const longitudReferencia = Number(import.meta.env.VITE_RESTAURANT_LON || -5.9845);
const zonaHoraria = import.meta.env.VITE_RESTAURANT_TIMEZONE || "auto";
export const etiquetaClima = "Andalucia, Espana (referencia Sevilla)";

const descripcionesClima = {
  0: "Cielo despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Niebla",
  48: "Niebla con escarcha",
  51: "Llovizna ligera",
  53: "Llovizna moderada",
  55: "Llovizna intensa",
  61: "Lluvia ligera",
  63: "Lluvia moderada",
  65: "Lluvia intensa",
  71: "Nieve ligera",
  73: "Nieve moderada",
  75: "Nieve intensa",
  80: "Chubascos ligeros",
  81: "Chubascos moderados",
  82: "Chubascos fuertes",
  95: "Tormenta"
};

function obtenerDescripcionClima(codigo) {
  return descripcionesClima[codigo] || "Clima variable";
}

function formatearFecha(fecha) {
  return fecha instanceof Date ? fecha.toISOString().slice(0, 10) : fecha;
}

export async function obtenerClimaReserva(fechaReserva) {
  if (!fechaReserva) {
    return null;
  }

  const fechaFormateada = formatearFecha(fechaReserva);
  const hoy = new Date();
  const fechaConsulta = new Date(`${fechaFormateada}T00:00:00`);
  const diferenciaDias = Math.floor((fechaConsulta - new Date(hoy.toDateString())) / 86400000);

  if (diferenciaDias < 0) {
    throw new Error("No se puede consultar el clima de una fecha pasada");
  }

  if (diferenciaDias > 15) {
    throw new Error("Solo se puede consultar el clima hasta 16 dias en adelante");
  }

  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", latitudReferencia);
  url.searchParams.set("longitude", longitudReferencia);
  url.searchParams.set("daily", [
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_probability_max"
  ].join(","));
  url.searchParams.set("timezone", zonaHoraria);
  url.searchParams.set("start_date", fechaFormateada);
  url.searchParams.set("end_date", fechaFormateada);

  const respuesta = await fetch(url.toString());
  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos?.reason || "No se pudo consultar el clima");
  }

  const indiceFecha = datos?.daily?.time?.indexOf(fechaFormateada);

  if (indiceFecha === -1 || indiceFecha === undefined) {
    throw new Error("No hay clima disponible para esa fecha");
  }

  return {
    fecha: fechaFormateada,
    descripcion: obtenerDescripcionClima(datos.daily.weather_code[indiceFecha]),
    temperaturaMaxima: datos.daily.temperature_2m_max[indiceFecha],
    temperaturaMinima: datos.daily.temperature_2m_min[indiceFecha],
    probabilidadLluvia: datos.daily.precipitation_probability_max[indiceFecha]
  };
}
