import {TabInterface} from './dashboard.type';
import {ItemListProduct} from './home.type';

interface ContentBlock {
  id: string;
  type: string;
  data: {
    text: string;
  };
}

interface Content {
  time: number;
  blocks: ContentBlock[];
  version: string;
}

interface Source {
  server: string;
  link: string;
}

export interface MediaInterface {
  id: number;
  square: string;
  path: string; // Relative path to media
}

//
export interface chapterEpisodeInterface {
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
  content: Content;
  thumbnail: string;
  author: number;
  rating_count: number;
  rating_total: number;
  views_day: number;
  views_week: number;
  views: number;
  source: Source[];
  suburl: string;
  index_number: number;
}
interface PersonInterface {
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
// detail post type

export interface detailPostInterface {
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
  feature: MediaInterface;
  banner: MediaInterface;
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
  chapter_total: number;
  quality: string;
  showtimes: string;
  like_count: number;
  release_date: string;
  release_year: Array<TabInterface>;
  // movie , comic
  categories: Array<TabInterface>;
  tags: Array<TabInterface>;
  country: Array<TabInterface>;
  actors: Array<PersonInterface>;
  directors: Array<PersonInterface>;
  chapters: Array<chapterEpisodeInterface>;
  creators: Array<PersonInterface>;
  // game
  iframe_game?: string;
  related_post?: ItemListProduct[];
}
