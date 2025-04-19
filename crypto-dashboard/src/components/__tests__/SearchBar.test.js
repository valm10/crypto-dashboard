import { render, screen, fireEvent} from  '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
    it('should update value and call onSearchChange when typing', () => {
        const handleChange = jest.fn(); 
        const searchTerm = '';

        render(<SearchBar searchTerm={searchTerm} onSearchChange={handleChange} />);

        const input = screen.getByPlaceholderText(/search coins/i);
        fireEvent.change(input, { target: { value: 'btc' } });

        expect(input.value).toBe('btc');

        expect(handleChange).toHaveBeenCalledWith('btc');
        expect(handleChange).toHaveBeenCalledTimes(1);
  });
});