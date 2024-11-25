const express = require("express");
const cors = require("cors");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database (if you're using one)
connectDB();

// Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes); // Added booking routes

// Default error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
