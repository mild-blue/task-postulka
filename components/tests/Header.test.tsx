import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Header from '@/components/Header';

it('shows title and subtitle centered', () => {
  render(<Header title="Hello" subtitle="World" />);
  expect(screen.getByText('Hello')).toBeTruthy();
  expect(screen.getByText('World')).toBeTruthy();
});