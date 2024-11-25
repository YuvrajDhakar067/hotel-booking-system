const Booking = require("../models/bookingModel");

// Create a new booking
const createBooking = async (req, res) => {
  const { name, email, roomType, checkIn, checkOut } = req.body;

  try {
    const newBooking = new Booking({
      name,
      email,
      roomType,
      checkIn,
      checkOut,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

// Get a booking by ID
const getBookingById = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error });
  }
};

module.exports = { createBooking, getAllBookings, getBookingById };
