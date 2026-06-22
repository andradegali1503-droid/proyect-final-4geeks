const mongoose = require("mongoose");

const esquemaReserva = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true,
      trim: true
    },
    people: {
      type: Number,
      required: true,
      min: 1
    },
    area: {
      type: String,
      enum: ["indoor", "terrace"],
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Reservation", esquemaReserva);
