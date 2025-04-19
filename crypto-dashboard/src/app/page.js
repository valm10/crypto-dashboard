"use client";

import { useEffect, useState } from 'react';

import { getTopCoins } from '@/utils/api';

export default function Home() {

  //Array of coins and updaters
  const [coins, setCoins] = useState([]);
  //loading state for waiting data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const data = await getTopCoins();
        setCoins(data);
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, []);

  if (loading) {
    return <p>Loading coins...</p>
  }

  return (
    <div>
      <h1>Crypto Dashboard</h1>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            {coins.name} - €{coin.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
}