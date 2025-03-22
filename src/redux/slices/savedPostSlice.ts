import { createSlice } from '@reduxjs/toolkit';
import { ItemListProduct } from '@types';
import { APP_SLICE } from '../type';

interface initDataInterface {
  movies: ItemListProduct[];
  comics: ItemListProduct[];
  novels: ItemListProduct[];

  histories?: ItemListProduct[];
  savedPost?: ItemListProduct[];
}

const initialState: initDataInterface = {
  movies: [],
  comics: [],
  novels: [],
  //
  histories: [],
  savedPost: [],
};

const savedPostSlice = createSlice({
  name: APP_SLICE.SAVE_POST_SLICE,
  initialState,
  reducers: {
    setMoviesSaved: (state, action) => {
      state.movies = action.payload;
    },
    setComicsSaved: (state, action) => {
      state.comics = action.payload;
    },
    setNovelsSaved: (state, action) => {
      state.novels = action.payload;
    },
    addItem: (state, action) => {
      const {type, item} = action.payload;
      if (
        type === 'movie' &&
        !state.movies.find(movie => movie.id === item.id)
      ) {
        state.movies.push(item);
      } else if (
        type === 'comic' &&
        !state.comics.find(comic => comic.id === item.id)
      ) {
        state.comics.push(item);
      } else if (
        type === 'novel' &&
        !state.novels.find(novel => novel.id === item.id)
      ) {
        state.novels.push(item);
      }
    },
    toggleItemSaved: (state, action) => {
      const {type, item} = action.payload;
      if (type === 'movie') {
        const index = state.movies.findIndex(movie => movie.id === item.id);
        if (index >= 0) {
          state.movies.splice(index, 1);
        } else {
          state.movies.push(item);
        }
      } else if (type === 'comic') {
        const index = state.comics.findIndex(comic => comic.id === item.id);
        if (index >= 0) {
          state.comics.splice(index, 1);
        } else {
          state.comics.push(item);
        }
      } else if (type === 'novel') {
        const index = state.novels.findIndex(novel => novel.id === item.id);
        if (index >= 0) {
          state.novels.splice(index, 1);
        } else {
          state.novels.push(item);
        }
      }
    },
    clearSavedPost: state => {
      state.movies = [];
      state.comics = [];
      state.novels = [];
    },
  },
});

export const {
  setMoviesSaved,
  setComicsSaved,
  setNovelsSaved,
  addItem,
  toggleItemSaved,
  clearSavedPost,
} = savedPostSlice.actions;

export default savedPostSlice.reducer;
