import React from 'react';
import styles from './components.module.css';
import MiniChart from './MiniChart';

function CoinCard({ coin }) {
    return (
        <div className={styles.card}>
            <img src={coin.image} alt={coin.name} width={32} height={32} />
            <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
            <p>💰 Price: €{coin.current_price}</p>
            <p>📈 24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>
            <p>🏦 Market Cap: €{coin.market_cap.toLocaleString()}</p>
            <p>🔁 Volume: €{coin.total_volume.toLocaleString()}</p>
            <p>📊 Rank: #{coin.market_cap_rank}</p>
            <p>🪙 Supply: {coin.circulating_supply.toLocaleString()}</p>
            {/* Graph placeholder */}
            <p style={{ color: '#999' }}>📉 Sparkline: [Coming soon]</p>
        </div>
    );
}

export default CoinCard;