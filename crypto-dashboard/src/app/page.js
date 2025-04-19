"use client";

import { useEffect, useState } from 'react';

import { getTopCoins } from '@/utils/api';

export default function Home() {

  const [coins, setCoins] = useState([]);

  return (
    <div>
      <h1>Crypto Dashboard</h1>
    </div>
  );
}