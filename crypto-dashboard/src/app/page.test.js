import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';
import '@testing-library/jest-dom';

// Mock the api module
jest.mock('@/services/api', () => ({
  getTopCoins: jest.fn(),
}));

import { getTopCoins } from '@/services/api';

describe('Home page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading state initially', () => {
    render(<Home />);
    expect(screen.getByText(/loading coins/i)).toBeInTheDocument();
  });

  test('renders coin card after successful API fetch', async () => {
    getTopCoins.mockResolvedValue([
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
        image: 'btc.png',
        current_price: 30000,
        price_change_percentage_24h: 2.5,
        market_cap: 1000000000,
        total_volume: 500000000,
        market_cap_rank: 1,
        circulating_supply: 19000000,
        sparkline_in_7d: { price: [1, 2, 3] },
      },
    ]);

    render(<Home />);
    expect(await screen.findByText(/Bitcoin/i)).toBeInTheDocument();
  });

  test('shows error message if API fails', async () => {
    getTopCoins.mockRejectedValue(new Error('API Error'));

    render(<Home />);
    expect(await screen.findByText(/failed to load coins/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });
});
