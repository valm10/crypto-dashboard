import { getTopCoins } from '@/services/api';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('getTopCoins API function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns coin data successfully', async () => {
    const fakeCoins = [{ id: 'bitcoin', name: 'Bitcoin' }];
    axios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: fakeCoins }),
    });

    const data = await getTopCoins();

    expect(data).toEqual(fakeCoins);
  });

  test('throws an error if API request fails', async () => {
    axios.create.mockReturnValue({
      get: jest.fn().mockRejectedValue(new Error('API Error')),
    });

    await expect(getTopCoins()).rejects.toThrow('API Error');
  });
});
