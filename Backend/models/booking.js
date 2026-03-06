const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  bike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bike"
  },
  pickup: String,
  drop: String,
  date: String,
  time: String,
  totalPrice: Number
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);