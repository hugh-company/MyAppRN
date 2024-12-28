export type chapterType = 'chapter' | 'series';

export interface episodeChapterInterface {
  id: number;
  name: string;
  duration?: string;
  releaseDate?: string;
  link?: string;
  type?: 'list' | 'text';
}
export interface chapterInterface {
  id: number;
  name: string;
  image?: string[];
  description?: string;
  views?: number;
  likes?: number;
  chapters?: episodeChapterInterface[];
  totalChapters?: number;
  currentChapter?: number;
  poster?: string;
  type: chapterType;
  isLiked?: boolean;
  isFavorite?: boolean;
  isWatched?: boolean;
  rating?: string;
  director?: string;
  actors?: string;
  main_actors?: string[];
  genres?: string;
  release_date?: string;
  duration?: string;
  tags?: string[];
  releaseDate?: string;
}

export interface chapterDetailInterface {
  id: number;
  name: string;
  image?: string[];
  description?: string;
  views?: number;
  likes?: number;
  rating?: number;
  chapters?: episodeChapterInterface[];
  totalChapters?: number;
  currentChapter?: number;
  poster?: string;
  type: chapterType;

  isLiked?: boolean;
  isFavorite?: boolean;
  isWatched?: boolean;

  director?: string;
  actors?: string;
  main_actors?: string[];
  genres?: string;
  release_date?: string;
  duration?: string;
  tags?: string[];
  releaseDate?: string;
}
