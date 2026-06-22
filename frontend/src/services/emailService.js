import emailjs from "@emailjs/browser";

const clavePublica = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
const idServicio = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const idPlantilla = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";

if (clavePublica) {
  emailjs.init({ publicKey: clavePublica });
}

export function obtenerVariablesEmailjsFaltantes() {
  const variablesFaltantes = [];

  if (!clavePublica) variablesFaltantes.push("VITE_EMAILJS_PUBLIC_KEY");
  if (!idServicio) variablesFaltantes.push("VITE_EMAILJS_SERVICE_ID");
  if (!idPlantilla) variablesFaltantes.push("VITE_EMAILJS_TEMPLATE_ID");

  return variablesFaltantes;
}

export async function enviarEmailConfirmacion(datosEmail) {
  const variablesFaltantes = obtenerVariablesEmailjsFaltantes();

  if (variablesFaltantes.length > 0) {
    return {
      ok: false,
      motivo: `Faltan estas variables de EmailJS: ${variablesFaltantes.join(", ")}`
    };
  }

  try {
    const respuesta = await emailjs.send(idServicio, idPlantilla, datosEmail);

    return {
      ok: true,
      respuesta
    };
  } catch (error) {
    return {
      ok: false,
      motivo: error?.text || error?.message || "No se pudo enviar el email",
      status: error?.status
    };
  }
}
