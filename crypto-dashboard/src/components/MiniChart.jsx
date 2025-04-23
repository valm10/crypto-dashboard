import React from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
//register needed chart parts
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

function MiniChart({ sparkline }) {
  //create fake x-axis labels
  const labels = sparkline.map((_, i) => i);
  //chart data configuration
  const data = {
    labels,
    datasets: [
      {
        label: '7d Price',
        data: sparkline,
        borderColor: '#3b82f6', //blue line
        backgroundColor: 'transparent',
        tension: 0.3, //line curved
        pointRadius: 0, //hide points
      },
    ],
  };
  //chart appearance options
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

export default MiniChart;
