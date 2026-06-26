import axios from "axios";

const baseUrlApi = (import.meta.env.VITE_API_URL || "https://proyect-final-4geeks.onrender.com").replace(/\/$/, "");
const baseUrlFinal = baseUrlApi.endsWith("/api") ? baseUrlApi : `${baseUrlApi}/api`;

const api = axios.create({
  baseURL: baseUrlFinal
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    console.error("Error en peticion al backend:", {
      url: error.config?.url,
      metodo: error.config?.method,
      status: error.response?.status,
      datos: error.response?.data || error.message
    });

    return Promise.reject(error);
  }
);

export default api;
