import {RootState} from '../rootReducer';

export const getToken = (state: RootState) => state.accountSlice.token;
export const getUserInfo = (state: RootState) => state.accountSlice.userInfo;
export const getFavoriteUser = (state: RootState) =>
  state.accountSlice.userInfo?.personal?.favorites || [];
