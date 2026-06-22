const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const encabezadoAuth = req.headers.authorization;

    if (!encabezadoAuth || !encabezadoAuth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autorizado, falta el token" });
    }

    const token = encabezadoAuth.split(" ")[1];

    if (token.startsWith("$2a$") || token.startsWith("$2b$")) {
      return res.status(401).json({
        message: "Token invalido",
        detalle: "Estas enviando un hash de bcrypt. Debes usar el token JWT que devuelve login o register."
      });
    }

    const datosToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(datosToken.userId).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "No autorizado, el token expiro"
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "No autorizado, token invalido"
      });
    }

    res.status(401).json({ message: "No autorizado, token invalido" });
  }
};

module.exports = protect;
