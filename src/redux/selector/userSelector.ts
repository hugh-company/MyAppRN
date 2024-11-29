import {RootState} from '../store';

export const getUserSelector = (state: RootState) =>
  state.accountSlice.userProfile;
export const getTokenSelector = (state: RootState) => state.accountSlice.token;
