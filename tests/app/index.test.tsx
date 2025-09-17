jest.mock('@/hooks/useFetch', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('expo-router', () => {
  const router = {
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
    navigate: jest.fn(),
  };
  return { useRouter: () => router, router };
});
jest.mock('@/components/GifDetail', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return () => <Text>GifDetail</Text>;
});

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import Index from '@/app/index';
import useFetch from '@/hooks/useFetch';

// mock fetch hook
const mockUseFetch = useFetch as jest.MockedFunction<any>;

beforeEach((): void => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach((): void => {
  jest.useRealTimers();
});

test('shows loading while fetching random gif', (): void => {
  mockUseFetch.mockReturnValue({
    data: null,
    loading: true,
    error: null,
    refetch: jest.fn(),
  });

  render(<Index />);

  expect(screen.getByText('Loading…')).toBeTruthy();
});

test('renders gif on success', (): void => {
  mockUseFetch.mockReturnValue({
    data: {
      id: '1',
      images: { original: { url: 'x', width: '1', height: '1' } },
    },
    loading: false,
    error: null,
    refetch: jest.fn(),
  });

  render(<Index />);

  expect(screen.getByText('Random selected GIF:')).toBeTruthy();
  expect(screen.getByText('GifDetail')).toBeTruthy();
});

test('shows error message when fetch fails', (): void => {
  mockUseFetch.mockReturnValue({
    data: null,
    loading: false,
    error: new Error('Boom'),
    refetch: jest.fn(),
  });

  render(<Index />);

  expect(screen.getByText('Boom')).toBeTruthy();
});

test('pressing search bar navigates to /search', (): void => {
  const { router } = require('expo-router');
  mockUseFetch.mockReturnValue({
    data: null,
    loading: true,
    error: null,
    refetch: jest.fn(),
  });

  render(<Index />);

  fireEvent.press(screen.getByLabelText('Open search'));
  expect(router.push).toHaveBeenCalledWith('/search');
});

test('refetches every 10 seconds while focused', async (): Promise<void> => {
  const refetch = jest.fn();
  mockUseFetch.mockReturnValue({
    data: null,
    loading: true,
    error: null,
    refetch,
  });

  render(<Index />);

  // 10s tick
  jest.advanceTimersByTime(10_000);
  await waitFor(() => expect(refetch).toHaveBeenCalledTimes(1));

  // 20s tick
  jest.advanceTimersByTime(10_000);
  await waitFor(() => expect(refetch).toHaveBeenCalledTimes(2));
});
