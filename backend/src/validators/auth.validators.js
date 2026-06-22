const { body } = require("express-validator");

const validacionRegistro = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El formato del email no es valido")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("La password es obligatoria")
    .bail()
    .isLength({ min: 6, max: 15 })
    .withMessage("La password debe tener entre 6 y 15 caracteres"),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser user o admin")
];

const validacionLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El formato del email no es valido")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("La password es obligatoria")
];

module.exports = {
  validacionRegistro,
  validacionLogin
};
