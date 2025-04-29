import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { getTopCoins } from '../services/api';
import React from 'react';

// Mock Charts
jest.mock('react-chartjs-2');
// Mock the API
jest.mock('../services/api', () => ({
  getTopCoins: jest.fn(),
}));

/**
 * Utility function to render Home component properly
 */
function setup() {
  render(<Home />);
}

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading initially', () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('displays error message if fetch fails', async () => {
    getTopCoins.mockRejectedValueOnce(new Error('API error'));
    setup();
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch coins/i)).toBeInTheDocument();
    });
  });

  it('renders coins after successful fetch', async () => {
    getTopCoins.mockResolvedValueOnce([
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
        current_price: 50000,
        price_change_percentage_24h: 2.5,
        market_cap: 900000000,
        total_volume: 30000000,
        market_cap_rank: 1,
        circulating_supply: 19000000,
        image: 'https://example.com/bitcoin.png',
        sparkline_in_7d: { price: [1, 2, 3] },
      },
    ]);
    setup();
    await waitFor(() => {
      expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
    });
  });

  it('filters coins based on search input', async () => {
    getTopCoins.mockResolvedValueOnce([
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', current_price: 50000, price_change_percentage_24h: 2.5, market_cap: 900000000, total_volume: 30000000, market_cap_rank: 1, circulating_supply: 19000000, image: 'https://example.com/bitcoin.png', sparkline_in_7d: { price: [1, 2, 3] } },
      { id: 'ethereum', name: 'Ethereum', symbol: 'eth', current_price: 4000, price_change_percentage_24h: 1.2, market_cap: 500000000, total_volume: 20000000, market_cap_rank: 2, circulating_supply: 10000000, image: 'https://example.com/ethereum.png', sparkline_in_7d: { price: [1, 2, 3] } },
    ]);

    setup();

    await waitFor(() => {
      expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
      expect(screen.getByText(/Ethereum/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/Search coin/i), { target: { value: 'Bitcoin' } });

    await waitFor(() => {
      expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
      expect(screen.queryByText(/Ethereum/i)).toBeNull();
    });
  });
});
