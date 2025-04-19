"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
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
    <main>
      <h1>Crypto Dashboard</h1>
      {coins.map((coin) => (
        <div key={coin.id} className={styles.card}>
            <img src={coin.image} alt={coin.name} width={32} height={32}/>

            <h2>
              {coin.name} ({coin.symbol.toUpperCase()})
            </h2>
            <p>💰 Price: €{coin.current_price}</p>
            <p>📈 24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>
            <p>🏦 Market Cap: €{coin.market_cap.toLocaleString()}</p>
            <p>🔁 Total Volume: €{coin.total_volume.toLocaleString()}</p>
            <p>📊 Rank: #{coin.market_cap_rank}</p>
            <p>🪙 Supply: {coin.circulating_supply.toLocaleString()}</p>
        </div>
      ))}
    </main>
  );
}