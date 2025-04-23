import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;

//get Top 10 coins by market cap in eur
export async function getTopCoins() {
  try {
    const response = await api.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "eur",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: true,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching top coins:", error);
    throw error;
  }
}
