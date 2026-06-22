const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const esquemaUsuario = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 15
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

esquemaUsuario.pre("save", async function guardarPassword(next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

esquemaUsuario.methods.compararPassword = function compararPassword(passwordRecibida) {
  return bcrypt.compare(passwordRecibida, this.password);
};

module.exports = mongoose.model("User", esquemaUsuario);
