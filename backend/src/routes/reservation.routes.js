const express = require("express");
const {
  createReservation,
  getMyReservations,
  cancelMyReservation,
  getAllReservations,
  updateReservationStatus,
  updateReservation,
  deleteReservation
} = require("../controllers/reservation.controller");
const protect = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/adminMiddleware");
const manejarErroresValidacion = require("../middlewares/validateMiddleware");
const {
  validacionCrearReserva,
  validacionIdReserva,
  validacionEstadoReserva,
  validacionActualizarReserva
} = require("../validators/reservation.validators");

const router = express.Router();

router.post("/", protect, validacionCrearReserva, manejarErroresValidacion, createReservation);
router.get("/mine", protect, getMyReservations);
router.patch(
  "/mine/:id/cancel",
  protect,
  validacionIdReserva,
  manejarErroresValidacion,
  cancelMyReservation
);
router.get("/", protect, adminOnly, getAllReservations);
router.patch(
  "/:id/status",
  protect,
  adminOnly,
  validacionEstadoReserva,
  manejarErroresValidacion,
  updateReservationStatus
);

router.patch(
  "/:id",
  protect,
  adminOnly,
  validacionActualizarReserva,
  manejarErroresValidacion,
  updateReservation
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  validacionIdReserva,
  manejarErroresValidacion,
  deleteReservation
);

module.exports = router;
