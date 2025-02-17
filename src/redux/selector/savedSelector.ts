import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const selectSavedPosts = (state: RootState) => state.savedPostSlice;

export const isMovieSaved = createSelector(
  [selectSavedPosts, (state, movieId: number) => movieId],
  (savedPosts, movieId) =>
    savedPosts.movies.some(movie => movie.id === movieId),
);

export const isComicSaved = createSelector(
  [selectSavedPosts, (state, comicId: number) => comicId],
  (savedPosts, comicId) =>
    savedPosts.comics.some(comic => comic.id === comicId),
);

export const isNovelSaved = createSelector(
  [selectSavedPosts, (state, novelId: number) => novelId],
  (savedPosts, novelId) =>
    savedPosts.novels.some(novel => novel.id === novelId),
);
