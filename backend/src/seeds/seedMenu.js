const dotenv = require("dotenv");
const conectarDB = require("../config/db");
const MenuItem = require("../models/MenuItem");
const menuAndaluz = require("../data/menuAndaluz");

dotenv.config();

const sembrarMenu = async () => {
  try {
    console.log("Iniciando carga del menu andaluz...");

    await conectarDB();

    await MenuItem.deleteMany({});
    console.log("Menu anterior eliminado");

    await MenuItem.insertMany(menuAndaluz);
    console.log(`Menu cargado correctamente con ${menuAndaluz.length} platos y bebidas`);

    process.exit(0);
  } catch (error) {
    console.error("Error al sembrar el menu:", error.message);
    process.exit(1);
  }
};

sembrarMenu();
