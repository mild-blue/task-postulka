import { GifObjectMinimal } from '@/interfaces/GifObject';

jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));
jest.mock('@/components/GifDetail', () => {
  const { Text } = require('react-native');
  return () => <Text>GifDetail</Text>;
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import GifInfo from '@/app/gif-info';
const { router, useLocalSearchParams } = jest.requireMock('expo-router');

afterEach(() => jest.clearAllMocks());

it('shows error when no gifInfo param is provided', (): void => {
  useLocalSearchParams.mockReturnValue({});
  render(<GifInfo />);
  expect(screen.getByText('Problem with loading GIF')).toBeTruthy();
});

it('renders header and detail when gifInfo is provided', (): void => {
  const payload = {
    id: '1',
    title: 'Funny Cat',
    alt_text: 'A cat dancing',
    url: 'https://example.com/',
    rating: 'pg',
    images: {
      original: {
        url: 'https://gif/original.gif',
        width: '100',
        height: '100',
      },
      fixed_width: {
        url: 'https://gif/fixed.gif',
        width: '100',
        height: '100',
      },
    },
  } satisfies GifObjectMinimal;
  useLocalSearchParams.mockReturnValue({
    gifInfo: encodeURIComponent(JSON.stringify(payload)),
  });

  render(<GifInfo />);

  // Header content appears
  expect(screen.getByText('Funny Cat')).toBeTruthy();
  expect(screen.getByText('A cat dancing')).toBeTruthy();

  // Child detail component renders
  expect(screen.getByText('GifDetail')).toBeTruthy();
});

it('shows error when gifInfo param is corrupted', (): void => {
  useLocalSearchParams.mockReturnValue({
    gifInfo: '%E0%A4%A', // invalid URI-encoded string
  });
  render(<GifInfo />);
  expect(screen.getByText('Problem with loading GIF')).toBeTruthy();
});

it('back button calls router.back()', (): void => {
  useLocalSearchParams.mockReturnValue({
    gifInfo: encodeURIComponent(
      JSON.stringify({
        images: { original: { url: 'x', width: '1', height: '1' } },
      }),
    ),
  });

  render(<GifInfo />);

  fireEvent.press(screen.getByLabelText('Go back'));
  expect(router.back).toHaveBeenCalled();
});
