const jwt = require("jsonwebtoken");

const generarToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

module.exports = generarToken;
