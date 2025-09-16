import { User } from '@/interfaces/User';
import { Images } from '@/interfaces/Images';

export interface GifObject {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string;
  user: User;
  source_tld: string;
  source_post_url: string;
  update_datetime: string;
  create_datetime: string;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  title: string;
  alt_text: string;
  is_low_contrast: boolean;
}

// use mini-version of GifObject for GifDetail component
export type GifObjectMinimal = Pick<
  GifObject,
  'id' | 'title' | 'alt_text' | 'url' | 'rating'
> & {
  images: Pick<
    GifObject['images'],
    'original' | 'fixed_width' | 'fixed_height'
  >;
};

export const convertGifObjectToMinimal = (gif: GifObject): GifObjectMinimal => {
  return {
    title: gif.title,
    alt_text: gif.alt_text,
    id: gif.id,
    rating: gif.rating,
    url: gif.url,
    images: {
      original: gif.images.original,
      fixed_width: gif.images.fixed_width,
      fixed_height: gif.images.fixed_height,
    },
  } satisfies GifObjectMinimal;
};
