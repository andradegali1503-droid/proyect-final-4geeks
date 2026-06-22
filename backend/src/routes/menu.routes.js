const express = require("express");
const {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require("../controllers/menu.controller");
const protect = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/adminMiddleware");
const manejarErroresValidacion = require("../middlewares/validateMiddleware");
const {
  validacionPlato,
  validacionIdPlato
} = require("../validators/menu.validators");

const router = express.Router();

router.get("/", getMenuItems);
router.post("/", protect, adminOnly, validacionPlato, manejarErroresValidacion, createMenuItem);
router.put(
  "/:id",
  protect,
  adminOnly,
  validacionIdPlato,
  validacionPlato,
  manejarErroresValidacion,
  updateMenuItem
);
router.delete("/:id", protect, adminOnly, validacionIdPlato, manejarErroresValidacion, deleteMenuItem);

module.exports = router;
