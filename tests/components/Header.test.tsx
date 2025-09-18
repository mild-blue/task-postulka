import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Header from '@/components/Header';

describe('Header', () => {
  it('shows title and description, and description is max 2 lines', (): void => {
    const subtitle =
      'Some descriptive subtitle that is too long and has to be on other line';

    render(<Header title="Hello world" subtitle={subtitle} />);

    // Title and subtitle render
    expect(screen.getByText('Hello world')).toBeTruthy();
    const subtitleNode = screen.getByText(subtitle);
    expect(subtitleNode).toBeTruthy();
    expect(subtitleNode.props.numberOfLines).toBe(2);
  });

  it('shows only title when there is no description', (): void => {
    render(<Header title="Only Title" />);

    // Title renders
    expect(screen.getByText('Only Title')).toBeTruthy();
    // No subtitle present
    expect(screen.queryByText(/descriptive|subtitle|World/i)).toBeNull();
  });
});
