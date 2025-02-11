import { createSlice } from '@reduxjs/toolkit';
import { ItemListProduct, ModuleItemInterface } from '@types';
import { APP_SLICE } from '../type';

const initialState = {
  home: [],
  movies: [],
  comics: [],
  games: [],
  dating: [],
  search: [],
  games_trending: [],
  loading: true,
} as {
  home: ModuleItemInterface[];
  movies: ModuleItemInterface[];
  comics: ModuleItemInterface[];
  games: ModuleItemInterface[];
  dating: ModuleItemInterface[];
  search: ModuleItemInterface[];
  loading: boolean;
  games_trending: ItemListProduct[];
};

const dataLocalSlide = createSlice({
  name: APP_SLICE.DATA_LOCAL_SLICE,
  initialState,
  reducers: {
    setHome: (state, action) => {
      state.home = action.payload;
      state.loading = false;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
      //state.loading = false;
    },
    setComics: (state, action) => {
      state.comics = action.payload;
      //state.loading = false;
    },
    setGames: (state, action) => {
      state.games = action.payload;
      //state.loading = false;
    },
    setDating: (state, action) => {
      state.dating = action.payload;
      //state.loading = false;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      //state.loading = false;
    },
    setLoadingDashboard: (state, action) => {
      state.loading = action.payload;
    },
    refreshData: (state, action) => {
      const { type, data } = action.payload;
      if (type in state) {
        (state as any)[type] = data;
      }
    },
    //game trending
    setGamesTrending(state, action) {
      state.games_trending = action.payload;
    },
  },
});

export const {
  setHome,
  setMovies,
  setComics,
  setGames,
  setDating,
  setSearch,
  setLoadingDashboard,
  refreshData,
  setGamesTrending,
} = dataLocalSlide.actions;

export const fetchHomeData = () => ({ type: 'FETCH_HOME_DATA' });
export const fetchGamesTrending = () => ({ type: 'FETCH_GAMES_TRENDING' });
export const fetchMoviesData = (params?: any) => ({ type: 'FETCH_MOVIES_DATA', payload: params });
export const fetchSearchData = (params?: any) => ({ type: 'FETCH_SEARCH_DATA', payload: params });
export const fetchComicsData = (params?: any) => ({ type: 'FETCH_COMICS_DATA', payload: params });
export const fetchGamesData = (params?: any) => ({ type: 'FETCH_GAMES_DATA', payload: params });
export const fetchDatingData = (params?: any) => ({ type: 'FETCH_DATING_DATA', payload: params });

export const refreshHomeData = () => ({ type: 'REFRESH_HOME_DATA' });
export const refreshMoviesData = (params?: any) => ({ type: 'REFRESH_MOVIES_DATA', payload: params });
export const refreshSearchData = (params?: any) => ({ type: 'REFRESH_SEARCH_DATA', payload: params });
export const refreshComicsData = (params?: any) => ({ type: 'REFRESH_COMICS_DATA', payload: params });
export const refreshGamesData = (params?: any) => ({ type: 'REFRESH_GAMES_DATA', payload: params });
export const refreshDatingData = (params?: any) => ({ type: 'REFRESH_DATING_DATA', payload: params });

export default dataLocalSlide.reducer;
