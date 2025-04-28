"use client";

import { useEffect, useState } from "react";
import { getTopCoins } from "@/services/api";
import CoinCard from "@/components/CoinCard";
import SearchBar from "@/components/SearchBar";
import styles from "./globals.css";

export default function Home() {
  //array of coins and updaters
  const [coins, setCoins] = useState([]);
  //shows "loading..." message until data is ready
  const [loading, setLoading] = useState(true);
  //track whats typed in search bar
  const [searchTerm, setSearchTerm] = useState("");
  //store last time data was refreshed
  const [lastUpdated, setLastUpdated] = useState(null);
  //filter coins based on search
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
      setCoins(data); //store data
      setLastUpdated(new Date()); //store time
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    } finally {
      setLoading(false); //turn off loading screen
    }
  }

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 60000); // auto-refresh 60s
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
