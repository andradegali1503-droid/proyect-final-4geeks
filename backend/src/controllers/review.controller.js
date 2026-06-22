const Review = require("../models/Review");

const getReviews = async (req, res, next) => {
  try {
    const resenas = await Review.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(resenas);
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const resena = await Review.create({
      user: req.user._id,
      rating,
      comment
    });

    const resenaCompleta = await resena.populate("user", "name");
    res.status(201).json(resenaCompleta);
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const resena = await Review.findById(req.params.id);

    if (!resena) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    await resena.deleteOne();
    res.json({ message: "Reseña eliminada" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReviews,
  createReview,
  deleteReview
};
