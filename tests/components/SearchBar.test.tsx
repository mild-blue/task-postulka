jest.mock('expo-router', () => ({
  router: { navigate: jest.fn() }, // add push/back later if needed
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SearchBar from '@/components/SearchBar';
const { router } = jest.requireMock('expo-router');

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NavigationContainer>{children}</NavigationContainer>
);

const renderSearchBar = (props: React.ComponentProps<typeof SearchBar> = {}) =>
  render(
    <SearchBar autofocus={false} value="" setValue={() => {}} {...props} />,
    { wrapper },
  );

afterEach(() => jest.clearAllMocks());

describe('SearchBar', () => {
  it('does not show clear icon when there is no value', (): void => {
    renderSearchBar({ value: '' });
    expect(screen.queryByLabelText('Clear search')).toBeNull();
  });

  it('shows clear icon when there is a value and clears on press', (): void => {
    const setValue = jest.fn();
    renderSearchBar({ value: 'cat', setValue });
    fireEvent.press(screen.getByLabelText('Clear search'));
    expect(setValue).toHaveBeenCalledWith('');
  });

  it('input is read-only on home screen (onPress provided)', (): void => {
    renderSearchBar({ onPress: jest.fn() });
    const input = screen.getByPlaceholderText('Search for GIFs...');
    expect(input.props.editable).toBe(false);
  });

  it('Cancel navigates home', (): void => {
    renderSearchBar();
    fireEvent.press(screen.getByText('Cancel'));
    expect(router.navigate).toHaveBeenCalledWith('/');
  });
});
