const mongoose = require("mongoose");

const conectarDB = async () => {
  const uriMongo = process.env.MONGODB_URI;

  if (!uriMongo) {
    throw new Error("MONGODB_URI no esta definida en las variables de entorno");
  }

  await mongoose.connect(uriMongo);

  mongoose.connection.on("error", (error) => {
    console.error("Error de MongoDB:", error.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB se desconecto");
  });

  console.log("MongoDB conectada");
};

module.exports = conectarDB;
