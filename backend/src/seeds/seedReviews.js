const dotenv = require("dotenv");
const conectarDB = require("../config/db");
const User = require("../models/User");
const Review = require("../models/Review");
const reviewsEjemplo = require("../data/reviewsEjemplo");

dotenv.config();

const sembrarResenas = async () => {
  try {
    console.log("Iniciando carga de reviews de ejemplo...");

    await conectarDB();

    const usuarioDemo = await User.findOne({ email: "demo@mesaclick.com" });

    if (!usuarioDemo) {
      await User.create({
        name: "Usuario Demo",
        email: "demo@mesaclick.com",
        password: "Demo1234",
        role: "user"
      });

      console.log("Usuario demo creado");
    }

    const usuario = await User.findOne({ email: "demo@mesaclick.com" });

    await Review.deleteMany({});
    console.log("Reviews anteriores eliminadas");

    const resenas = reviewsEjemplo.map((resena) => ({
      user: usuario._id,
      rating: resena.rating,
      comment: resena.comment
    }));

    await Review.insertMany(resenas);
    console.log(`Reviews cargadas correctamente con ${resenas.length} ejemplos`);

    process.exit(0);
  } catch (error) {
    console.error("Error al sembrar reviews:", error.message);
    process.exit(1);
  }
};

sembrarResenas();
