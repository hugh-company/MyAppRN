export interface gameInterface {
  id: number;
  name: string;
  type?: string;
  description?: string;
  views?: number;
  likes?: number;
  link?: string;
  poster?: string;
  images?: string[];
  isLiked?: boolean;
  isFavorite?: boolean;
  isWatched?: boolean;
  rating?: string;
  director?: string;
  actors?: string;
  genres?: string;
  release_date?: string;
  duration?: string;
  tags?: string[];
  releaseDate?: string;
}
