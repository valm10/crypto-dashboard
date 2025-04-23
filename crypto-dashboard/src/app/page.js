"use client";

import { useEffect, useState } from "react";
import { getTopCoins } from "@/utils/api";
import CoinCard from "@/components/CoinCard";
import SearchBar from "@/components/SearchBar";
import styles from "./globals.css";

export default function Home() {
  //Array of coins and updaters
  const [coins, setCoins] = useState([]);
  //loading state for waiting data
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  //declare lastUpdate
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

    //60 seconds interval
    const interval = setInterval(fetchCoins, 60000);
    return () => clearInterval(interval); //cleanup
  }, []);

  if (loading) {
    return <p>Loading coins...</p>;
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
