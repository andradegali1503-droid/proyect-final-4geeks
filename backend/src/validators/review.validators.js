const { body, param } = require("express-validator");

const validacionCrearReview = [
  body("rating")
    .notEmpty()
    .withMessage("La calificacion es obligatoria")
    .isInt({ min: 1, max: 5 })
    .withMessage("La calificacion debe estar entre 1 y 5"),
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("El comentario es obligatorio")
    .isLength({ min: 3, max: 500 })
    .withMessage("El comentario debe tener entre 3 y 500 caracteres")
];

const validacionIdReview = [
  param("id").isMongoId().withMessage("El id de la reseña no es valido")
];

module.exports = {
  validacionCrearReview,
  validacionIdReview
};
