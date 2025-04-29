"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components only once
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

// MiniChart component: shows the 7-day chart for a coin
export default function MiniChart({ sparkline }) {
  const labels = sparkline.map((_, index) => index); // create simple labels (0,1,2...)

  const data = {
    labels,
    datasets: [
      {
        label: '7d Price',
        data: sparkline,
        borderColor: '#3b82f6',
        backgroundColor: 'transparent',
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div style={{ height: '50px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
}

// PropTypes validation
MiniChart.propTypes = {
  sparkline: PropTypes.arrayOf(PropTypes.number).isRequired,
};
