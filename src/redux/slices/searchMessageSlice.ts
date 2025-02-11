import {createSlice} from '@reduxjs/toolkit';
import {APP_SLICE} from '../type';

interface SocketState {}

const initialState: SocketState = {};

const searchMessageSlice = createSlice({
  name: APP_SLICE.SEARCH_MESSAGE_SLICE,
  initialState,
  reducers: {},
});

export const {} = searchMessageSlice.actions;

export default searchMessageSlice.reducer;
