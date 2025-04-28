"use client";

import React, { useEffect, useState } from "react";
import { getTopCoins } from "@/services/api";
import CoinCard from "@/components/CoinCard";
import SearchBar from "@/components/SearchBar";
import styles from "../styles/globals.css";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
      setError(false); // clear any previous errors
    } catch (error) {
      console.error("Failed to fetch coins:", error);
      setError(true); // set error if fetching fails
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 60000); // refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Loading coins...</p>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>🚨 Failed to load coins. Please try refreshing.</p>
        <button onClick={fetchCoins}>Retry</button>
      </div>
    );
  }

  return (
    <main>
      <h1>Crypto Dashboard</h1>
      <div>
        <button onClick={fetchCoins} className="refresh-button">
          Refresh Coins
        </button>

        {lastUpdated && (
          <span className="last-updated">
            Last Updated: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="coin-grid">
        {filteredCoins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </main>
  );
}
