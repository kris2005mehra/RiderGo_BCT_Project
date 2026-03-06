const Bike = require("../models/bike");

exports.getBikes = async (req, res) => {
  const bikes = await Bike.find();
  res.json(bikes);
};

exports.addBike = async (req, res) => {
  const bike = new Bike(req.body);
  await bike.save();
  res.json({ message: "Bike Added" });
};