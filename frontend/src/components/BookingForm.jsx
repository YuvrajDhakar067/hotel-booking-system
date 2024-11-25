import React, { useState } from "react";
import '../../src/app.css';
import { sendConfirmationEmail } from "../services/email";
const BookingForm = () => {
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Send booking data to the backend
      const response = await fetch("https://hotel-booking-system-5ggo.onrender.com/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (response.ok) {
        const bookingData = await response.json();
        // After successful booking, send the confirmation email
        await sendConfirmationEmail(booking.email, booking);
        setMessage("Booking confirmed! Confirmation email sent.");
      } else {
        setMessage("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error sending booking:", error);
      setMessage("Error occurred while processing the booking.");
    }

    setLoading(false);
  };

  return (
    <div className="booking-form">
      <h2>Book a Room</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={booking.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={booking.email}
          onChange={handleChange}
          required
        />
        <select
          name="roomType"
          value={booking.roomType}
          onChange={handleChange}
          required
        >
          <option value="">Select Room Type</option>
          <option value="Deluxe Room">Deluxe Room</option>
          <option value="Luxury Suite">Luxury Suite</option>
          <option value="Economy Room">Economy Room</option>
          <option value="Presidential Suite">Presidential Suite</option>
        </select>
        <input
          type="date"
          name="checkIn"
          value={booking.checkIn}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="checkOut"
          value={booking.checkOut}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingForm;
