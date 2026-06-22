const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Se requiere acceso de administrador" });
  }

  next();
};

module.exports = adminOnly;
