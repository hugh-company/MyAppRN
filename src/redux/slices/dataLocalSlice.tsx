import { createSlice } from '@reduxjs/toolkit';
import { HistoryInterface, ModuleItemInterface, UserItemInterface } from '@types';
import { APP_SLICE } from '../type';

const initialState = {
  home: [],
  movies: [],
  comics: [],
  games: [],
  dating: [],
  search: [],
  savedItems: [] as HistoryInterface[], // Max 100 items with timestamp
  history: [] as HistoryInterface[], // Max 50 items with timestamp
  loading: true,
  userPremium: [],
} as {
  home: ModuleItemInterface[];
  movies: ModuleItemInterface[];
  comics: ModuleItemInterface[];
  games: ModuleItemInterface[];
  dating: ModuleItemInterface[];
  search: ModuleItemInterface[];
  savedItems: HistoryInterface[];
  history: HistoryInterface[];
  userPremium: UserItemInterface[]
  loading: boolean;
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
    addSavedItem: (state, action) => {

      if (state.savedItems.length < 100) {
        // Remove any existing entry with the same ID
        state.savedItems = state.savedItems.filter(item => item.id !== action.payload.id);
        // Add the new entry to the top
        state.savedItems = [
          action.payload, // Save the entire detail object
          ...state.savedItems,
        ];

      } {
        state.savedItems.pop();
      }
    },
    removeSavedItem: (state, action) => {
      state.savedItems = state.savedItems.filter(item => item.id !== action.payload);
    },
    clearSavedItems: (state) => {
      state.savedItems = [];
    },
    // remove array of history items
    removeSavedItems: (state, action) => {
      state.savedItems = state.savedItems.filter(item => !action.payload.includes(item.id));
    },
    addHistoryItem: (state, action) => {
      // Remove any existing entry with the same ID
      state.history = state.history.filter(item => item.id !== action.payload.id);
      // Add the new entry to the top
      state.history = [
        action.payload, // Save the entire detail object
        ...state.history,
      ];
      if (state.history.length > 50) {
        state.history.pop(); // Remove the oldest item if the limit is exceeded
      }
    },
    removeHistoryItem: (state, action) => {
      state.history = state.history.filter(item => item.id !== action.payload);
    },
    // remove array of history items
    removeHistoryItems: (state, action) => {
      state.history = state.history.filter(item => !action.payload.includes(item.id));
    },
    clearHistory: (state) => {
      state.history = [];
    },

    setUserPremium: (state, action) => {
      state.userPremium = action.payload;
    },
  },
});

export const {
  setUserPremium,
  setHome,
  setMovies,
  setComics,
  setGames,
  setDating,
  setSearch,
  setLoadingDashboard,
  refreshData,
  addSavedItem,
  removeSavedItem,
  clearSavedItems,
  addHistoryItem,
  removeHistoryItem,
  clearHistory, removeHistoryItems, removeSavedItems,
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
