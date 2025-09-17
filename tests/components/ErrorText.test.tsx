import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ErrorText from '@/components/ErrorText';

test('renders given message', (): void => {
  render(<ErrorText message="Oops!" />);
  expect(screen.getByText('Oops!')).toBeTruthy();
});

test('shows default message when none provided', (): void => {
  render(<ErrorText />);
  expect(screen.getByText('Unexpected error.')).toBeTruthy();
});
