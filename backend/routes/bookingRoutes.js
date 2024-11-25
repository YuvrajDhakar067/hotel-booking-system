const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
} = require("../controllers/bookingController");

const router = express.Router();

// POST /api/bookings - Create a new booking
router.post("/", createBooking);

// GET /api/bookings - Get all bookings
router.get("/", getAllBookings);

// GET /api/bookings/:id - Get a booking by ID
router.get("/:id", getBookingById);

module.exports = router;
