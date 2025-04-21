import { render, screen, fireEvent} from  '@testing-library/react';
import userEvent from "testing-library/user-event";

import SearchBar from '../SearchBar';

//create test
test('updates value and calls handler', async() => {
  const mockHandler = jest.fn(); //fake function to check if its called
  render(<SearchBar searchTerm="" onSearchChange={mockHandler} />);

//find Input

const input = screen.getByRole('textbox');

//type intoo the input
await userEvent.type(input, 'eth');

//expect handler to be called multiple times
expect(mockHandler).toHaveBeenCalled();
});