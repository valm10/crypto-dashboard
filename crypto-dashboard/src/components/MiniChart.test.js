import { render, screen } from '@testing-library/react';
import MiniChart from '../MiniChart';
import '@testing-library/jest-dom';

// Mock Line chart from react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Line: () => <div>Mocked Line Chart</div>,
}));

test('renders MiniChart with sparkline data', () => {
  const fakeSparkline = [1, 2, 3, 4, 5];

  render(<MiniChart sparkline={fakeSparkline} />);

  expect(screen.getByText('Mocked Line Chart')).toBeInTheDocument();
});
