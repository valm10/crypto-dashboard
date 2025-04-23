import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

//render and check if input is on the screen
test("renders the search input", () => {
    render(<SearchBar searchTerm="" onSearchChange={() => {}} />);
  
    const input = screen.getByPlaceholderText(/search coin/i);
    expect(input).toBeInTheDocument();
  });
  