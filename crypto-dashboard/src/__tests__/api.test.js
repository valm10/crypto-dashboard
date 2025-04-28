import api, { getTopCoins } from '@/services/api';

// Mock the api instance
jest.mock('@/services/api', () => {
  const originalModule = jest.requireActual('@/services/api');
  return {
    __esModule: true,
    ...originalModule,
    default: {
      get: jest.fn(),
    },
  };
});

describe('getTopCoins', () => {
  test('returns coin data successfully', async () => {
    const fakeCoins = [{ id: 'bitcoin', name: 'Bitcoin' }];
    api.get.mockResolvedValue({ data: fakeCoins });

    const data = await getTopCoins();

    expect(api.get).toHaveBeenCalledWith('/coins/markets', {
      params: {
        vs_currency: 'eur',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: true,
      },
    });
    expect(data).toEqual(fakeCoins);
  });

  test('throws an error if API request fails', async () => {
    api.get.mockRejectedValue(new Error('API Error'));
    await expect(getTopCoins()).rejects.toThrow('API Error');
  });
});
