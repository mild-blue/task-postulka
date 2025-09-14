import { User } from '@/types/User';
import { Images } from '@/types/Images';

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
  user: User,
  source_tld: string;
  source_post_url: string;
  update_datetime: string;
  create_datetime: string;
  import_datetime: string;
  trending_datetime: string;
  images: Images,
  title: string;
  alt_text: string;
  is_low_contrast: boolean;
}