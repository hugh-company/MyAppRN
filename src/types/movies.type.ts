export interface episodeInterface {
  id: number;
  title: string;
  duration: string;
  releaseDate?: string;
  link?: string;
}

export interface movieInterface {
  id: number;
  name: string;
  image?: string;
  description?: string;
  views?: number;
  likes?: number;
  episodes?: episodeInterface[];
  totalEpisodes?: number;
  currentEpisode?: number;
  poster?: string;
}

export type movieType = 'movie' | 'series';
export interface movieDetailInterface {
  id: number;
  name: string;
  image?: string;
  description?: string;
  views?: number;
  likes?: number;
  episodes?: episodeInterface[];
  totalEpisodes?: number;
  currentEpisode?: number;
  poster?: string;
  type: movieType;
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
}
export interface MovieDetailScreenProps {
  movie: movieInterface;
}
