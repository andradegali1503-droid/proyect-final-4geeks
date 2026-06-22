const express = require("express");
const cors = require("cors");

const rutasAuth = require("./routes/auth.routes");
const rutasReservas = require("./routes/reservation.routes");
const rutasMenu = require("./routes/menu.routes");
const rutasReviews = require("./routes/review.routes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*"
  })
);
app.use(express.json());

app.use((error, req, res, next) => {
  if (error && error.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "El body no es un JSON valido. Usa raw JSON en Postman.",
      detalle: "No envies texto suelto, hashes bcrypt ni objetos mal cerrados."
    });
  }

  next(error);
});

app.get("/api/health", (req, res) => {
  res.json({ message: "MesaClick API funcionando correctamente" });
});

app.use("/api/auth", rutasAuth);
app.use("/api/reservations", rutasReservas);
app.use("/api/menu", rutasMenu);
app.use("/api/reviews", rutasReviews);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Error interno del servidor"
  });
});

module.exports = app;
