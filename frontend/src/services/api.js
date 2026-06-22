import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
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
