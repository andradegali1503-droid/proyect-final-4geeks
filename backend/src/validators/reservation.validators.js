const { body, param } = require("express-validator");

const areasValidas = ["indoor", "terrace"];
const estadosValidos = ["pending", "confirmed", "cancelled"];

const validacionCrearReserva = [
  body("date")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .isISO8601()
    .withMessage("La fecha debe tener formato valido"),
  body("time")
    .trim()
    .notEmpty()
    .withMessage("La hora es obligatoria")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("La hora debe usar el formato HH:MM"),
  body("people")
    .notEmpty()
    .withMessage("La cantidad de personas es obligatoria")
    .isInt({ min: 1, max: 12 })
    .withMessage("La cantidad de personas debe estar entre 1 y 12"),
  body("area")
    .trim()
    .notEmpty()
    .withMessage("El area es obligatoria")
    .isIn(areasValidas)
    .withMessage("El area debe ser indoor o terrace")
];

const validacionIdReserva = [
  param("id").isMongoId().withMessage("El id de la reserva no es valido")
];

const validacionEstadoReserva = [
  ...validacionIdReserva,
  body("status")
    .trim()
    .notEmpty()
    .withMessage("El estado es obligatorio")
    .isIn(estadosValidos)
    .withMessage("El estado debe ser pending, confirmed o cancelled")
];

module.exports = {
  validacionCrearReserva,
  validacionIdReserva,
  validacionEstadoReserva
};
