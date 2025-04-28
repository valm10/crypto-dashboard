import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/pages/page';
import '@testing-library/jest-dom';

// Mock api response
jest.mock('@/services/api', () => ({
  getTopCoins: jest.fn(() =>
    Promise.resolve([
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
    ])
  ),
}));

describe('Home page', () => {
  test('shows loading state initially', () => {
    render(<Home />);
    expect(screen.getByText(/loading coins/i)).toBeInTheDocument();
  });

  test('renders coin card after data fetch', async () => {
    render(<Home />);
    const coinName = await screen.findByText(/Bitcoin/i);
    expect(coinName).toBeInTheDocument();
  });

  test('filters coins when search term changes', async () => {
    render(<Home />);
    const input = await screen.findByPlaceholderText(/search coin/i);
    await userEvent.type(input, 'bit');
    expect(await screen.findByText(/Bitcoin/i)).toBeInTheDocument();
  });
});
