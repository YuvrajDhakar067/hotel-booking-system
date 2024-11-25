import React, { useState, useEffect } from "react";
import "../../src/App.css";
import BookingForm from "../components/BookingForm"; // Importing the BookingForm component

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching room data dynamically (replace with your actual API endpoint or local data)
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rooms"); // Replace with your backend API URL
        const data = await response.json();
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room data:", error);
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="container">
      {/* Header Section */}
      <header>
        <h1>Welcome to Our Hotel Booking System</h1>
      </header>

      {/* Room List Section */}
        <h2>Available Rooms</h2>
      <section className="room-list">
        {loading ? (
          <p>Loading rooms...</p>
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.id} className="room-card">
              <h3>{room.name}</h3>
              <p>Type: {room.type}</p>
              <p>Price: {room.price}</p>
              {/* Display additional room details if needed */}
            </div>
          ))
        ) : (
          <p>No rooms available at the moment.</p>
        )}
      </section>

      {/* BookingForm Component Section */}
      <section className="booking-form-section">
        <BookingForm rooms={rooms} /> {/* Passing rooms data as props */}
      </section>

      {/* Footer Section */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Hotel Booking System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
