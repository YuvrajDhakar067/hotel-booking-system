const {createBooking,getAllBookings,getBookingById} = require("./bookingController.js")
const Booking = require("../models/bookingModel.js");

// Mock the Booking model
jest.mock("../models/bookingModel.js");

describe("createBooking", () => {
  let req, res;

  beforeEach(() => {
    // Mock request and response objects
    req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        roomType: "Deluxe",
        checkIn: "2024-11-01",
        checkOut: "2024-11-05",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should save a new booking and return 201 status", async () => {
    // Mock the Booking.save method
    const mockSavedBooking = {
      id: "1",
      ...req.body,
    };
    Booking.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockSavedBooking),
    }));

    await createBooking(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockSavedBooking);
  });

  it("should return 500 status on error", async () => {
    // Mock save method to throw an error
    Booking.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error("Database error")),
    }));

    await createBooking(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error creating booking",
      error: expect.any(Error),
    });
  });
});


jest.mock('../models/bookingModel'); // Mock Booking model to avoid real database calls

describe('getAllBookings', () => {
  let req, res;

  beforeEach(() => {
    req = {}; // Mock request object
    res = {
      status: jest.fn().mockReturnThis(), // Mock the status method
      json: jest.fn(), // Mock the json method
    };
    jest.clearAllMocks(); // Clear any previous mocks
  });

  it('should fetch all bookings and return 200 status', async () => {
    // Mock Booking.find to return an array of bookings
    const mockBookings = [
      { name: 'John Doe', email: 'john@example.com', roomType: 'Deluxe' },
      { name: 'Jane Smith', email: 'jane@example.com', roomType: 'Standard' },
    ];
    Booking.find.mockResolvedValue(mockBookings);

    // Call the controller function
    await getAllBookings(req, res);

    // Assert the response
    expect(Booking.find).toHaveBeenCalledTimes(1); // Ensure Booking.find is called
    expect(res.status).toHaveBeenCalledWith(200); // Ensure status 200 is sent
    expect(res.json).toHaveBeenCalledWith(mockBookings); // Ensure correct response data
  });

  it('should handle errors and return 500 status', async () => {
    // Mock Booking.find to throw an error
    const mockError = new Error('Database error');
    Booking.find.mockRejectedValue(mockError);

    // Call the controller function
    await getAllBookings(req, res);

    // Assert the error response
    expect(Booking.find).toHaveBeenCalledTimes(1); // Ensure Booking.find is called
    expect(res.status).toHaveBeenCalledWith(500); // Ensure status 500 is sent
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error fetching bookings',
      error: mockError,
    });
  });
});

jest.mock('../models/bookingModel'); // Mock the Booking model to avoid real DB operations

describe('getBookingById', () => {
  let req, res;

  beforeEach(() => {
    req = { params: { id: '12345' } }; // Mock request object with booking ID
    res = {
      status: jest.fn().mockReturnThis(), // Mock status method
      json: jest.fn(), // Mock json method
    };
    jest.clearAllMocks(); // Clear previous mocks
  });

  it('should fetch a booking by ID and return 200 status', async () => {
    // Mock Booking.findById to return a booking
    const mockBooking = {
      _id: '12345',
      name: 'John Doe',
      email: 'john@example.com',
      roomType: 'Deluxe',
      checkIn: '2024-11-01',
      checkOut: '2024-11-05',
    };
    Booking.findById.mockResolvedValue(mockBooking);

    // Call the controller function
    await getBookingById(req, res);

    // Assertions
    expect(Booking.findById).toHaveBeenCalledWith('12345'); // Ensure correct ID is passed
    expect(res.status).toHaveBeenCalledWith(200); // Ensure status 200 is sent
    expect(res.json).toHaveBeenCalledWith(mockBooking); // Ensure correct booking is returned
  });

  it('should return 404 status if booking is not found', async () => {
    // Mock Booking.findById to return null
    Booking.findById.mockResolvedValue(null);

    // Call the controller function
    await getBookingById(req, res);

    // Assertions
    expect(Booking.findById).toHaveBeenCalledWith('12345'); // Ensure correct ID is passed
    expect(res.status).toHaveBeenCalledWith(404); // Ensure status 404 is sent
    expect(res.json).toHaveBeenCalledWith({ message: 'Booking not found' }); // Ensure correct error message is sent
  });

  it('should handle errors and return 500 status', async () => {
    // Mock Booking.findById to throw an error
    const mockError = new Error('Database error');
    Booking.findById.mockRejectedValue(mockError);

    // Call the controller function
    await getBookingById(req, res);

    // Assertions
    expect(Booking.findById).toHaveBeenCalledWith('12345'); // Ensure correct ID is passed
    expect(res.status).toHaveBeenCalledWith(500); // Ensure status 500 is sent
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error fetching booking',
      error: mockError,
    }); // Ensure correct error message is sent
  });
});