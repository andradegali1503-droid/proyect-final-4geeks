const dotenv = require("dotenv");
const app = require("./src/app");
const conectarDB = require("./src/config/db");

dotenv.config();

const puerto = process.env.PORT || 5000;
const entorno = process.env.NODE_ENV || "development";
const urlCliente = process.env.CLIENT_URL || "no definida";
const urlApi = `http://localhost:${puerto}`;

const iniciarServidor = async () => {
  try {
    console.log("Iniciando MesaClick API...");
    console.log(`Entorno: ${entorno}`);
    console.log(`Cliente permitido: ${urlCliente}`);

    await conectarDB();

    app.listen(puerto, () => {
      console.log(`Servidor corriendo en: ${urlApi}`);
      console.log("Estado: conexion exitosa");
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
};

process.on("unhandledRejection", (error) => {
  console.error("Error no controlado:", error.message);
});

process.on("uncaughtException", (error) => {
  console.error("Excepcion no controlada:", error.message);
  process.exit(1);
});

iniciarServidor();
