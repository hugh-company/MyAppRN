import {RootState} from '../store';

export const getHomeModuleLocal = (state: RootState) =>
  state.dataLocalSlide.home;

export const getMoviesModuleLocal = (state: RootState) =>
  state.dataLocalSlide.movies;

export const getComicsModuleLocal = (state: RootState) =>
  state.dataLocalSlide.comics;

export const getGamesModuleLocal = (state: RootState) =>
  state.dataLocalSlide.games;

export const getDatingModuleLocal = (state: RootState) =>
  state.dataLocalSlide.dating;

export const getSearchModuleLocal = (state: RootState) =>
  state.dataLocalSlide.search;

export const getGameTrendingLocal = (state: RootState) =>
  state.dataLocalSlide.games_trending;
