"use client";

import { useEffect, useState } from 'react';
import { getTopCoins } from '@/utils/api';
import CoinCard from '@/components/CoinCard';
import SearchBar from '@/components/SearchBar';

export default function Home() {

  //Array of coins and updaters
  const [coins, setCoins] = useState([]);
  //loading state for waiting data
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
      {filteredCoins.map((coin) => (
        <CoinCard key={coin.id} coin={coin}/>
      ))}
    </main>
  );
}