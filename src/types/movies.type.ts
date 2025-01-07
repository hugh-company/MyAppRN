import {TabsInterface} from './home.type';

export interface sourceEpisodeInterface {
  link: string;
  server: string;
}
export interface episodeInterface {
  id: number;
  title: string;
  slug: string;
  lang_slug: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  movie: number;
  seo_title: string;
  seo_desc: string;
  content: {
    time: number;
    blocks: Array<{
      id: string;
      type: string;
      data: Record<string, any>;
    }>;
    version: string;
  };
  thumbnail: string;
  author: number;
  rating_count: number;
  rating_total: number;
  views_day: number;
  views_week: number;
  views: number;
  source: sourceEpisodeInterface[];
  suburl: string;
  index_number: number;
}

export type movieType = 'movie' | 'series';
export interface Media {
  id: number;
  square: string;
  path: string; // Relative path to media
}
export interface movieDetailInterface {
  id: number;
  title: string;
  slug: string;
  lang_slug: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  seo_title: string;
  seo_desc: string;
  content: {
    time: number;
    blocks: Array<{
      id: string;
      type: string;
      data: Record<string, any>;
    }>;
    version: string;
  };
  feature: Media;
  author: number;
  rating_count: number;
  rating_total: number;
  views_day: number;
  views_week: number;
  views: number;
  description: string;
  duration: number;
  movie_status: string;
  imdb_id: number;
  adult: string;
  original_language: string;
  trailer: string;
  cinema: string;
  movie_type: 'movie' | 'tvseries';
  episode_total: number;
  quality: string;
  showtimes: string;
  like_count: number;
  banner: {
    id: number;
    path: string;
    square: string;
  };
  release_date: string;
  cmovie: Array<TabsInterface>;
  release_year: Array<TabsInterface>;
  country: Array<TabsInterface>;
  tags: Array<TabsInterface>;
  episode: Array<episodeInterface>;
  actor: Array<PersonInterface>;
  director: Array<PersonInterface>;
}
export interface PersonInterface {
  id: number;
  title: string;
  slug: string;
  lang_slug: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  seo_title: string;
  seo_desc: string;
  content: {
    time: number;
    blocks: Array<{
      id: string;
      type: string;
      data: Record<string, any>;
    }>;
    version: string;
  };
  thumbnail: string;
  author: string;
  rating_count: number;
  rating_total: number;
  views_day: number;
  views_week: number;
  views: number;
  birth_date: string;
  birth_place: string;
  gender: string;
  original_name: string;
  height: number;
  weight: number | string;
  death_date: string;
  social_media: Array<{
    url_social: string;
    name_social: string;
  }>;
}
