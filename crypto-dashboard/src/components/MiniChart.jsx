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

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function MiniChart({ sparkline }) {
  // Generate x-axis labels (indexes)
  const labels = sparkline.map((_, index) => index);

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

MiniChart.propTypes = {
  sparkline: PropTypes.arrayOf(PropTypes.number).isRequired,
};
