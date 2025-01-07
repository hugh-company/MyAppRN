import {MediaFeature, TabsInterface} from './home.type';

interface ContentBlock {
  id: string;
  type: string;
  data: {
    text: string;
    level?: number;
  };
}

interface Content {
  time: number;
  blocks: ContentBlock[];
  version: string;
}

export interface gameInterface {
  id: number;
  title: string;
  slug: string;
  lang_slug: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  seo_title: string;
  seo_desc: string;
  content: Content;
  banner: MediaFeature;
  author: number;
  rating_count: number;
  rating_total: number;
  views_day: number;
  views_week: number;
  views: number;
  like_count: number;
  iframe_game: string;
  description: string;
  feature: MediaFeature;
  release_date: string;
  cgame: TabsInterface[];
  tags: TabsInterface[];
}
