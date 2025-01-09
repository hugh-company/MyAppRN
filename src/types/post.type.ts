import {PostTypeKey} from './common.type';

export interface MediaFeature {
  id: number;
  path: string;
  square: string;
}
interface BannerImageInterface {
  id: number;
  path: string;
}
export interface ItemListProduct {
  id: number;
  title: string;
  slug: string;
  status: string;
  rating_count: number;
  rating_total: number;
  views: number;
  feature: MediaFeature;
  banner: BannerImageInterface;
  cinema: string;
  movie_type: string;
  duration: number;
  trailer: string;
  episode_total: number;
  like_count: number;
  release_date: string;
  posttype: PostTypeKey;
  chapter_total?: number;
  // game
}
