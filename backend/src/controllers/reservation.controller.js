const Reservation = require("../models/Reservation");
const {
  CAPACIDAD_POR_AREA,
  ESTADOS_RESERVA_ACTIVOS
} = require("../utils/reservationRules");

const createReservation = async (req, res, next) => {
  try {
    const { date, time, people, area } = req.body;
    const fechaReserva = new Date(date);

    if (Number.isNaN(fechaReserva.getTime())) {
      return res.status(400).json({ message: "La fecha de la reserva no es valida" });
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    fechaReserva.setHours(0, 0, 0, 0);

    if (fechaReserva < hoy) {
      return res.status(400).json({ message: "La fecha de la reserva no puede ser pasada" });
    }

    const reservaExistenteUsuario = await Reservation.findOne({
      user: req.user._id,
      date: fechaReserva,
      time,
      status: { $in: ESTADOS_RESERVA_ACTIVOS }
    });

    if (reservaExistenteUsuario) {
      return res.status(409).json({
        message: "Ya tienes una reserva activa para esa fecha y hora"
      });
    }

    const reservasEnHorario = await Reservation.countDocuments({
      date: fechaReserva,
      time,
      area,
      status: { $in: ESTADOS_RESERVA_ACTIVOS }
    });

    if (reservasEnHorario >= CAPACIDAD_POR_AREA[area]) {
      return res.status(409).json({
        message: `Ya no hay cupo en ${area} para esa fecha y hora`
      });
    }

    const reserva = await Reservation.create({
      user: req.user._id,
      date: fechaReserva,
      time,
      people,
      area
    });

    const reservaCompleta = await reserva.populate("user", "name email");
    res.status(201).json(reservaCompleta);
  } catch (error) {
    next(error);
  }
};

const getMyReservations = async (req, res, next) => {
  try {
    const reservas = await Reservation.find({ user: req.user._id }).sort({
      date: 1,
      time: 1
    });

    res.json(reservas);
  } catch (error) {
    next(error);
  }
};

const cancelMyReservation = async (req, res, next) => {
  try {
    const reserva = await Reservation.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    if (reserva.status === "cancelled") {
      return res.status(400).json({ message: "La reserva ya esta cancelada" });
    }

    reserva.status = "cancelled";
    await reserva.save();

    res.json(reserva);
  } catch (error) {
    next(error);
  }
};

const getAllReservations = async (req, res, next) => {
  try {
    const reservas = await Reservation.find()
      .populate("user", "name email")
      .sort({ date: 1, time: 1 });

    res.json(reservas);
  } catch (error) {
    next(error);
  }
};

const updateReservationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const estadosPermitidos = ["pending", "confirmed", "cancelled"];

    if (!estadosPermitidos.includes(status)) {
      return res.status(400).json({ message: "El estado de la reserva no es valido" });
    }

    const reserva = await Reservation.findById(req.params.id);

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    if (reserva.status === status) {
      return res.status(400).json({ message: "La reserva ya tiene ese estado" });
    }

    reserva.status = status;
    await reserva.save();

    const reservaCompleta = await reserva.populate("user", "name email");
    res.json(reservaCompleta);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  cancelMyReservation,
  getAllReservations,
  updateReservationStatus
};
