const express = require("express");
const { getRooms, getRoomById } = require("../controllers/roomController");

const router = express.Router();

// Routes for fetching room data
router.get("/", getRooms); // GET /api/rooms
router.get("/:id", getRoomById); // GET /api/rooms/:id

module.exports = router;
