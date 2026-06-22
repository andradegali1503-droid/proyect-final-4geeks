const express = require("express");
const { register, login, getProfile } = require("../controllers/auth.controller");
const protect = require("../middlewares/authMiddleware");
const manejarErroresValidacion = require("../middlewares/validateMiddleware");
const { validacionRegistro, validacionLogin } = require("../validators/auth.validators");

const router = express.Router();

router.post("/register", validacionRegistro, manejarErroresValidacion, register);
router.post("/login", validacionLogin, manejarErroresValidacion, login);
router.get("/me", protect, getProfile);

module.exports = router;
