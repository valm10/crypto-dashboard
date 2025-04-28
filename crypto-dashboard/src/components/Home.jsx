"use client";

import React, { useEffect, useState } from 'react';
import { getTopCoins } from '../services/api';
import CoinCard from './CoinCard';
import SearchBar from './SearchBar';
import styles from '../styles/components.module.css';

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch top coins when the component mounts
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getTopCoins();
        setCoins(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  // Filter coins by search term
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch coins.</div>;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Crypto Dashboard</h1>

      <div className={styles.refreshBar}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      <div className={styles.coinGrid}>
        {filteredCoins.map(coin => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
}
