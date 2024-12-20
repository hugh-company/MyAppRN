export interface episodeInterface {
  id: number;
  title: string;
  duration: string;
  releaseDate?: string;
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
}
