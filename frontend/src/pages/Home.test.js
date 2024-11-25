import { render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";
import '@testing-library/jest-dom';

// Mocking the global fetch API
global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]), // Mock response for .json()
    })
  );

describe("Home Component", () => {
  it("renders loading state while fetching rooms", async () => {
    // Mock fetch to simulate API call
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });

    render(<Home />);

    // Assert that loading state is shown
    expect(screen.getByText("Loading rooms...")).toBeInTheDocument();
  });

  it("displays rooms once fetched", async () => {
    const mockRooms = [
      { id: 1, name: "Room 1", type: "Single", price: "$100" },
      { id: 2, name: "Room 2", type: "Double", price: "$200" },
    ];

    // Mock fetch response
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockRooms),
    });

    render(<Home />);

    await waitFor(() => expect(screen.getByText("Room 1")).toBeInTheDocument());

    // Verify that room names are displayed
    expect(screen.getByText("Room 1")).toBeInTheDocument();
    expect(screen.getByText("Room 2")).toBeInTheDocument();
  });
});
