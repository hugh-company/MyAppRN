import {RootState} from '../rootReducer';
export const getSocket = (state: RootState) => state.socketSlice.socket;
export const getJoinedConversation = (state: RootState) =>
  state.socketSlice.joinedConversation;
