import Constants from 'expo-constants';
import { GifObject } from '@/interfaces/GifObject';

export const GIF_CONFIG = {
  baseUrl: 'https://api.giphy.com/v1/gifs',
  apiKey: Constants.expoConfig?.extra?.gifApiKey ?? '',
  headers: {
    accept: 'application/json',
  },
};

/**
 * Fetch one random GIF from the Giphy API for home page.
 */
export const fetchRandomGif = async (): Promise<GifObject> => {
  const endpoint = `${GIF_CONFIG.baseUrl}/random?api_key=${GIF_CONFIG.apiKey}`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: GIF_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error('Failed to fetch GIF', response.statusText);
  }

  const result = await response.json();
  return result.data;
};

/**
 * Fetch first 30 GIFs by search query from the Giphy API.
 * @param query - The search query string.
 */
export const fetchGifsByQuery = async (query: string): Promise<GifObject[]> => {
  const endpoint = `${GIF_CONFIG.baseUrl}/search?api_key=${GIF_CONFIG.apiKey}&q=${encodeURIComponent(query)}&limit=30`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: GIF_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(
      'Failed to fetch GIFs by search query',
      // @ts-ignore
      response.statusText,
    );
  }

  const result = await response.json();
  return result.data;
};
