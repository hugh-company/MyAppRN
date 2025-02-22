import {RootState} from '../rootReducer';
export const getConversation = (state: RootState) =>
  state.chatSlice.conversation;
export const getMessage = (state: RootState) => state.chatSlice.message;
export const getJoinedConversation = (state: RootState) =>
  state.chatSlice.joinedConversation;
