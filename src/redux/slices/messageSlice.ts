import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface MessageState {
  messages: string[];
  loading: boolean;
  error: string | null;
  socketConnected: boolean;
  page: number;
  isNext: boolean;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
  socketConnected: false,
  page: 1,
  isNext: true,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
    updateSocket: (state, action: PayloadAction<boolean>) => {
      state.socketConnected = action.payload;
    },
    loadMoreMessages: state => {
      state.loading = true;
    },
    loadMoreMessagesSuccess: (
      state,
      action: PayloadAction<{messages: string[]; isNext: boolean}>,
    ) => {
      state.messages = [...state.messages, ...action.payload.messages];
      state.loading = false;
      state.page += 1;
      state.isNext = action.payload.isNext;
    },
    loadMoreMessagesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    refreshMessages: state => {
      state.loading = true;
      state.page = 1;
      state.isNext = true;
    },
    refreshMessagesSuccess: (state, action: PayloadAction<string[]>) => {
      state.messages = action.payload;
      state.loading = false;
    },
    refreshMessagesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  sendMessage,
  updateSocket,
  loadMoreMessages,
  loadMoreMessagesSuccess,
  loadMoreMessagesFailure,
  refreshMessages,
  refreshMessagesSuccess,
  refreshMessagesFailure,
  setLoading,
} = messageSlice.actions;

export default messageSlice.reducer;
