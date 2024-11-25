const Room = require("../models/roomModel");

// Sample data (use database queries in production)
const rooms = [
  { id: 1, name: "Deluxe Room", type: "Single", price: "$100/night" },
  { id: 2, name: "Luxury Suite", type: "Double", price: "$200/night" },
  { id: 3, name: "Economy Room", type: "Single", price: "$80/night" },
  { id: 4, name: "Presidential Suite", type: "Suite", price: "$500/night" },
];

// Get all rooms
const getRooms = async (req, res) => {
  try {
    // Uncomment below for database interaction
    //  const rooms = await Room.find();
    
    res.json(rooms); // Send sample data as response (replace with database data)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
};

// Get a specific room by ID
const getRoomById = async (req, res) => {
  const roomId = req.params.id;
  
  try {
    // Uncomment for database interaction
    // const room = await Room.findById(roomId);

    const room = rooms.find(room => room.id === parseInt(roomId)); // Use sample data
    
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch room" });
  }
};

module.exports = { getRooms, getRoomById };
