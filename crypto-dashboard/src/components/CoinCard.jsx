"use client";

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components.module.css';
import MiniChart from './MiniChart';

// Displays coin information + mini chart
export default function CoinCard({ coin }) {
  const {
    image,
    name,
    symbol,
    current_price,
    price_change_percentage_24h,
    market_cap,
    total_volume,
    market_cap_rank,
    circulating_supply,
    sparkline_in_7d,
  } = coin;

  return (
    <div className={styles.card}>
      <img src={image} alt={name} width={32} height={32} />
      <h2>
        {name} ({symbol.toUpperCase()})
      </h2>
      <p>💰 Price: €{current_price.toLocaleString()}</p>
      <p>📈 24h Change: {price_change_percentage_24h?.toFixed(2)}%</p>
      <p>🏦 Market Cap: €{market_cap.toLocaleString()}</p>
      <p>🔁 Volume: €{total_volume.toLocaleString()}</p>
      <p>📊 Rank: #{market_cap_rank}</p>
      <p>🪙 Supply: {circulating_supply.toLocaleString()}</p>
      {sparkline_in_7d?.price && <MiniChart sparkline={sparkline_in_7d.price} />}
    </div>
  );
}

// PropTypes validation
CoinCard.propTypes = {
  coin: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    current_price: PropTypes.number.isRequired,
    price_change_percentage_24h: PropTypes.number,
    market_cap: PropTypes.number.isRequired,
    total_volume: PropTypes.number.isRequired,
    market_cap_rank: PropTypes.number.isRequired,
    circulating_supply: PropTypes.number.isRequired,
    sparkline_in_7d: PropTypes.shape({
      price: PropTypes.arrayOf(PropTypes.number),
    }),
  }).isRequired,
};
