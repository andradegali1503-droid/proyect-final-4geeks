const express = require("express");
const {
  createReservation,
  getMyReservations,
  cancelMyReservation,
  getAllReservations,
  updateReservationStatus
} = require("../controllers/reservation.controller");
const protect = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/adminMiddleware");
const manejarErroresValidacion = require("../middlewares/validateMiddleware");
const {
  validacionCrearReserva,
  validacionIdReserva,
  validacionEstadoReserva
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

module.exports = router;
