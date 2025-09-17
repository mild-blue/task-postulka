jest.mock('@/hooks/useFetch', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('expo-router', () => ({ Link: ({ children }: any) => children }));

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react-native';
import Search from '@/app/search';

// mock fetch hook
const mockUseFetch = jest.requireMock('@/hooks/useFetch').default as jest.Mock;

beforeEach((): void => {
  jest.useFakeTimers();
  jest.clearAllMocks();

  // default return shape for the hook
  mockUseFetch.mockReturnValue({
    data: [],
    loading: false,
    error: null,
    refetch: jest.fn(),
    reset: jest.fn(),
  });
});

afterEach((): void => {
  jest.useRealTimers();
});

test('shows helper text before 2 chars', (): void => {
  render(<Search />);
  expect(screen.getByText('Type at least 2 characters')).toBeTruthy();
});

test('shows spinner while debouncing (>=2 chars, before 500ms)', (): void => {
  render(<Search />);

  fireEvent.changeText(screen.getByPlaceholderText('Search for GIFs...'), 'ca');
  expect(screen.getByText('Loading…')).toBeTruthy();
});

test('shows API error after debounce when hook has error', async (): Promise<void> => {
  mockUseFetch.mockReturnValue({
    data: [],
    loading: false,
    error: new Error('API failed'),
    refetch: jest.fn(),
    reset: jest.fn(),
  });

  render(<Search />);

  fireEvent.changeText(
    screen.getByPlaceholderText('Search for GIFs...'),
    'dog',
  );
  await act(async (): Promise<void> => {
    jest.advanceTimersByTime(500);
  });
  await waitFor(() => expect(screen.getByText('API failed')).toBeTruthy());
});
