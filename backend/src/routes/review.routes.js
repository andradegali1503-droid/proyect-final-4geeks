const express = require("express");
const {
  getReviews,
  createReview,
  deleteReview
} = require("../controllers/review.controller");
const protect = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/adminMiddleware");
const manejarErroresValidacion = require("../middlewares/validateMiddleware");
const {
  validacionCrearReview,
  validacionIdReview
} = require("../validators/review.validators");

const router = express.Router();

router.get("/", getReviews);
router.post("/", protect, validacionCrearReview, manejarErroresValidacion, createReview);
router.delete("/:id", protect, adminOnly, validacionIdReview, manejarErroresValidacion, deleteReview);

module.exports = router;
