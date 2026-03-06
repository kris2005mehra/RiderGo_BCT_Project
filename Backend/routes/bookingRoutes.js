const router = require("express").Router();
const { createBooking } = require("../controllers/bookingController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, createBooking);

module.exports = router;