import {KeyDataLocal} from '@types';
import {RootState} from '../store';

const getHomeModuleLocal = (state: RootState) => state.dataLocalSlide.home;

const getMoviesModuleLocal = (state: RootState) => state.dataLocalSlide.movies;

const getComicsModuleLocal = (state: RootState) => state.dataLocalSlide.comics;

const getGamesModuleLocal = (state: RootState) => state.dataLocalSlide.games;

const getDatingModuleLocal = (state: RootState) => state.dataLocalSlide.dating;

export const getModuleLocal = (state: RootState, type: string) => {
  switch (type) {
    case KeyDataLocal.HOME:
      return getHomeModuleLocal(state);
    case KeyDataLocal.MOVIES:
      return getMoviesModuleLocal(state);
    case KeyDataLocal.COMICS:
      return getComicsModuleLocal(state);
    case KeyDataLocal.GAMES:
      return getGamesModuleLocal(state);
    case KeyDataLocal.DATING:
      return getDatingModuleLocal(state);
    default:
      return [];
  }
};
