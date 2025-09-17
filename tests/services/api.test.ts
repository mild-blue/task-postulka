import { fetchRandomGif, fetchGifsByQuery, GIF_CONFIG } from '@/services/api';

// Mock expo-constants so GIF_CONFIG.apiKey is stable in tests
jest.mock('expo-constants', () => ({
  expoConfig: { extra: { gifApiKey: 'TEST_KEY' } },
}));

beforeEach((): void => {
  global.fetch = jest.fn() as any;
});

afterEach((): void => {
  jest.resetAllMocks();
});

test('fetchRandomGif builds correct URL and returns data', async (): Promise<void> => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => ({ data: { id: '123' } }),
  });

  const data = await fetchRandomGif();

  expect(fetch).toHaveBeenCalledWith(
    `${GIF_CONFIG.baseUrl}/random?api_key=TEST_KEY`,
    { method: 'GET', headers: GIF_CONFIG.headers },
  );
  expect(data).toEqual({ id: '123' });
});

test('fetchGifsByQuery encodes query and limits to 30', async (): Promise<void> => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => ({ data: [{ id: 'a' }] }),
  });

  const data = await fetchGifsByQuery('cat & dog');

  expect(fetch).toHaveBeenCalledWith(
    `${GIF_CONFIG.baseUrl}/search?api_key=TEST_KEY&q=cat%20%26%20dog&limit=30`,
    { method: 'GET', headers: GIF_CONFIG.headers },
  );
  expect(data).toEqual([{ id: 'a' }]);
});

test('throws on non-OK with status in message', async (): Promise<void> => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status: 500,
    statusText: 'Server Error',
    json: async () => ({ message: 'oops' }),
  });

  await expect(fetchRandomGif()).rejects.toThrow(
    /HTTP 500 Server Error|Failed to fetch GIF: 500/,
  );
});
