"use client";

import { useEffect, useState } from "react";
import { getTopCoins } from "@/services/api";
import CoinCard from "@/components/CoinCard";
import SearchBar from "@/components/SearchBar";
import styles from "../styles/Home.module.css"; // Corrected style import

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const filteredCoins = coins.filter((coin) => {
    const term = searchTerm.toLowerCase();
    return (
      coin.name.toLowerCase().includes(term) ||
      coin.symbol.toLowerCase().includes(term)
    );
  });

  async function fetchCoins() {
    try {
      const data = await getTopCoins();
      setCoins(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Loading coins...</p>;
  }

  return (
    <main className={styles.main}>
      <h1>Crypto Dashboard</h1>
      <div className={styles.refreshSection}>
        <button onClick={fetchCoins} className={styles.refreshButton}>
          Refresh Coins
        </button>

        {lastUpdated && (
          <span className={styles.lastUpdated}>
            Last Updated: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className={styles.coinGrid}>
        {filteredCoins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </main>
  );
}
