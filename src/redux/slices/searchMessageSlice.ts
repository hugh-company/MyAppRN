import {createSlice} from '@reduxjs/toolkit';
import {ConversationInterface} from '@types';
import {APP_SLICE} from '../type';

interface SocketState {
  conversations: ConversationInterface[];
  cursor_time: string;
  is_next: boolean;
  isRefreshing?: boolean;
  isLoadMore?: boolean;
  loading?: boolean;
  error?: string | null;
}

const initialState: SocketState = {
  conversations: [],
  cursor_time: '',
  is_next: false,
  isRefreshing: false,
  isLoadMore: false,
  loading: false,
  error: null,
};

const searchMessageSlice = createSlice({
  name: APP_SLICE.SEARCH_MESSAGE_SLICE,
  initialState,
  reducers: {
    searchThreads: (state, action) => {
      state.loading = true;
    },
    searchThreadsSuccess: (state, action) => {
      state.conversations = action.payload.conversations;
      state.cursor_time = action.payload.cursor_time;
      state.is_next = action.payload.is_next;
      state.loading = false;
    },
    searchThreadsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    loadMoreSearchConversations: (state, action) => {
      state.isLoadMore = true;
    },
    loadMoreSearchConversationsSuccess: (state, action) => {
      state.conversations = [
        ...state.conversations,
        ...action.payload.conversations,
      ];
      state.cursor_time = action.payload.cursor_time;
      state.is_next = action.payload.is_next;
      state.isLoadMore = false;
    },
    loadMoreSearchConversationsFailure: (state, action) => {
      state.error = action.payload;
      state.isLoadMore = false;
    },

    clearSearchThreads: state => {
      state.conversations = [];
      state.cursor_time = '';
      state.is_next = false;
      state.isRefreshing = false;
      state.isLoadMore = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  searchThreads,
  searchThreadsSuccess,
  searchThreadsFailure,
  loadMoreSearchConversations,
  loadMoreSearchConversationsSuccess,
  loadMoreSearchConversationsFailure,
  clearSearchThreads,
} = searchMessageSlice.actions;

export default searchMessageSlice.reducer;

// call api
export const searchThreadsSagaAction = (params?: any) => ({
  type: 'FETCH_SEARCH_THREADS',
  payload: params,
});
export const loadMoreSearchConversationsSagaAction = (params?: any) => ({
  type: 'FETCH_LOAD_MORE_SEARCH_CONVERSATIONS',
  payload: params,
});
