import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import '@testing-library/jest-dom';

// Test if input renders
test('renders the search input', () => {
  render(<SearchBar searchTerm="" onSearchChange={() => {}} />);
  const input = screen.getByPlaceholderText(/search coin/i);
  expect(input).toBeInTheDocument();
});

// Test typing event
test('calls onSearchChange when input changes', () => {
  const mockHandler = jest.fn();

  render(<SearchBar searchTerm="" onSearchChange={mockHandler} />);
  const input = screen.getByPlaceholderText(/search coin/i);

  fireEvent.change(input, { target: { value: 'bitcoin' } });
  expect(mockHandler).toHaveBeenCalledWith('bitcoin');
});

// Test initial input value
test('input displays the current searchTerm', () => {
  render(<SearchBar searchTerm="eth" onSearchChange={() => {}} />);
  const input = screen.getByPlaceholderText(/search coin/i);

  expect(input.value).toBe('eth');
});
