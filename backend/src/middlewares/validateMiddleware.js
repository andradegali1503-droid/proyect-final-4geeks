const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errores = validationResult(req);

  if (errores.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    message: "Error de validacion",
    errors: errores.array().map((error) => ({
      field: error.path,
      message: error.msg
    }))
  });
};

module.exports = handleValidationErrors;
