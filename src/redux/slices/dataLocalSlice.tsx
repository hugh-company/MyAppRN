import { createSlice } from '@reduxjs/toolkit';
import { ModuleItemInterface } from '@types';
import { APP_SLICE } from '../type';

const initialState = {
  home: [],
  movies: [],
  comics: [],
  games: [],
  dating: [],
} as {
  home: ModuleItemInterface[];
  movies: ModuleItemInterface[];
  comics: ModuleItemInterface[];
  games: ModuleItemInterface[];
  dating: ModuleItemInterface[];
};

const dataLocalSlide = createSlice({
  name: APP_SLICE.ACCOUNT_SLICE,
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
  },
});

export const {
  setHome,
  setMovies,
  setComics,
  setGames,
  setDating,

} = dataLocalSlide.actions;
export default dataLocalSlide.reducer;
