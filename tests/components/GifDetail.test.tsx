import React from 'react';
import { render, screen } from '@testing-library/react-native';
import GifDetail from '@/components/GifDetail';
import { GifObjectMinimal } from '@/interfaces/GifObject';

const gifMinimal = {
  id: '1',
  title: 'Cat',
  rating: 'pg',
  alt_text: 'A cute cat',
  url: 'https://gif/page.html',
  images: {
    original: { url: 'https://gif/original.gif', width: '400', height: '300' },
    fixed_width: { url: 'https://gif/fixed.gif', width: '200', height: '200' },
  },
} satisfies GifObjectMinimal;

test("shows 'Problem with loading GIF' when there is no url", (): void => {
  const noUrl = {
    ...gifMinimal,
    images: { ...gifMinimal.images, original: {} },
  };
  render(<GifDetail gif={noUrl} />);
  expect(screen.getByText('Problem with loading GIF.')).toBeTruthy();
});

test("shows 'N/A' in title when there is no title", (): void => {
  const noTitle = { ...gifMinimal, title: null };
  render(<GifDetail gif={noTitle as any as GifObjectMinimal} />);
  expect(screen.getByText('N/A')).toBeTruthy(); // title fallback
  expect(screen.getByText('PG')).toBeTruthy(); // rating still rendered
});

test("shows 'N/A' in rating when there is no rating", (): void => {
  const noRating = { ...gifMinimal, rating: null };
  render(<GifDetail gif={noRating as any as GifObjectMinimal} />);
  expect(screen.getByText('Cat')).toBeTruthy(); // title present
  expect(screen.getByText('N/A')).toBeTruthy(); // rating fallback
});
