const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("RiderGo Backend API Running 🚀");
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bikes", require("./routes/bikeRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});