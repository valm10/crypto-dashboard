import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

// Get Top 10 coins by market cap in EUR
export async function getTopCoins() {
  const response = await api.get('/coins/markets', {
    params: {
      vs_currency: 'eur',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: true,
    },
  });

  return response.data;
}
