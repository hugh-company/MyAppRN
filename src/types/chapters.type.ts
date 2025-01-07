import {TabsInterface} from './home.type';
import {Media, PersonInterface} from './movies.type';

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

interface ChapterContent {
  id: number;
  name: string;
  path: string;
}

export interface ChapterEpisode {
  id: number;
  title: string;
  slug: string;
  lang_slug: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  seo_title: string;
  seo_desc: string;
  index: string;
  content: ChapterContent[] | Content;
  feature: Media | null;
  rating_count: number;
  rating_total: number;
  views_day: number;
  views_week: number;
  views: number;
}

interface SocialMedia {
  name_social: string;
  url_social: string;
}

export interface chapterDetailInterface {
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
  feature: Media;
  banner: Media;
  author: number;
  rating_count: number;
  rating_total: number;
  views_day: number;
  views_week: number;
  views: number;
  like_count: number;
  public_status: string;
  release_date: string;
  chapter: ChapterEpisode[];
  creator: PersonInterface[];
  description: string;
  ccomic: TabsInterface[];
  tags: TabsInterface[];
}
