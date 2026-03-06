const Booking = require("../models/booking");

exports.createBooking = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { bikeId, pickup, drop, date, time } = req.body;

    if (!bikeId) return res.status(400).json({ msg: "Bike missing" });

    const booking = await Booking.create({
      user: req.user.id,
      bike: bikeId,
      pickup,
      drop,
      date,
      time
    });

    res.json(booking);

  } catch (err) {
    console.log("BOOKING ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};