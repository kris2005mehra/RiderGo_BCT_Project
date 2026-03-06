const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String
}, { timestamps: true });

module.exports = mongoose.model("Bike", bikeSchema);