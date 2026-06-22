const MenuItem = require("../models/MenuItem");

const getMenuItems = async (req, res, next) => {
  try {
    const platos = await MenuItem.find().sort({ category: 1, name: 1 });
    res.json(platos);
  } catch (error) {
    next(error);
  }
};

const createMenuItem = async (req, res, next) => {
  try {
    const plato = await MenuItem.create(req.body);
    res.status(201).json(plato);
  } catch (error) {
    next(error);
  }
};

const updateMenuItem = async (req, res, next) => {
  try {
    const plato = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!plato) {
      return res.status(404).json({ message: "Plato no encontrado" });
    }

    res.json(plato);
  } catch (error) {
    next(error);
  }
};

const deleteMenuItem = async (req, res, next) => {
  try {
    const plato = await MenuItem.findById(req.params.id);

    if (!plato) {
      return res.status(404).json({ message: "Plato no encontrado" });
    }

    await plato.deleteOne();
    res.json({ message: "Plato eliminado" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
