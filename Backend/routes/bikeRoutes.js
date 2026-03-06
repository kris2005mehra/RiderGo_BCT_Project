const router = require("express").Router();
const { getBikes, addBike } = require("../controllers/bikeController");

router.get("/", getBikes);
router.post("/", addBike);

module.exports = router;