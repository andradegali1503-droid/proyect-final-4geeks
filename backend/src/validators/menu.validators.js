const { body, param } = require("express-validator");

const validacionPlato = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre debe tener como maximo 100 caracteres"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripcion es obligatoria")
    .isLength({ max: 500 })
    .withMessage("La descripcion debe tener como maximo 500 caracteres"),
  body("price")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un numero positivo"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("La categoria es obligatoria")
    .isLength({ max: 50 })
    .withMessage("La categoria debe tener como maximo 50 caracteres"),
  body("image")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("La imagen debe ser una URL valida"),
  body("available")
    .optional()
    .isBoolean()
    .withMessage("Available debe ser true o false")
];

const validacionIdPlato = [
  param("id").isMongoId().withMessage("El id del plato no es valido")
];

module.exports = {
  validacionPlato,
  validacionIdPlato
};
