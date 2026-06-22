const User = require("../models/User");
const generarToken = require("../utils/generateToken");

const armarRespuestaAuth = (usuario) => ({
  _id: usuario._id,
  name: usuario.name,
  email: usuario.email,
  role: usuario.role,
  token: generarToken(usuario._id)
});

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const usuarioExistente = await User.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const usuario = await User.create({
      name,
      email,
      password,
      role: role === "admin" ? "admin" : "user"
    });

    res.status(201).json(armarRespuestaAuth(usuario));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });

    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    res.json(armarRespuestaAuth(usuario));
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  register,
  login,
  getProfile
};
