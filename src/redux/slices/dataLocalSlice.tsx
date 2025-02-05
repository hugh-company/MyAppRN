import { createSlice } from '@reduxjs/toolkit';
import { ModuleItemInterface } from '@types';
import { APP_SLICE } from '../type';

const initialState = {
  home: [],
  movies: [],
  comics: [],
  games: [],
  dating: [],
  search: [],
} as {
  home: ModuleItemInterface[];
  movies: ModuleItemInterface[];
  comics: ModuleItemInterface[];
  games: ModuleItemInterface[];
  dating: ModuleItemInterface[];
  search: ModuleItemInterface[];
};

const dataLocalSlide = createSlice({
  name: APP_SLICE.DATA_LOCAL_SLICE,
  initialState,
  reducers: {
    setHome: (state, action) => {
      state.home = action.payload;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setComics: (state, action) => {
      state.comics = action.payload;
    },
    setGames: (state, action) => {
      state.games = action.payload;
    },
    setDating: (state, action) => {
      state.dating = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  setHome,
  setMovies,
  setComics,
  setGames,
  setDating, setSearch,

} = dataLocalSlide.actions;
export default dataLocalSlide.reducer;
