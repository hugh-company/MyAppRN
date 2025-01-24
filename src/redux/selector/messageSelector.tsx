import { RootState } from '../store';

export const selectMessages = (state: RootState) => state.messageSlice.messages;
export const selectLoading = (state: RootState) => state.messageSlice.loading;
export const selectError = (state: RootState) => state.messageSlice.error;
export const selectSocketConnected = (state: RootState) => state.messageSlice.socketConnected;
export const selectIsNext = (state: RootState) => state.messageSlice.isNext;
