import {apiService} from '@api';
import {createSlice} from '@reduxjs/toolkit';
import {UserInterface} from '@types';
import {APP_SLICE} from '../type';
import {setIsDashboardDating} from './settingSlice';

const initialState = {
  token: '',
  userInfo: undefined,
} as {
  token: string;
  userInfo: UserInterface | undefined;
};

const accountSlice = createSlice({
  name: APP_SLICE.ACCOUNT_SLICE,
  initialState,
  reducers: {
    setToken: (state, action) => {
      console.log('setToken', action.payload);

      apiService.setToken(action.payload);
      apiService.setTokenWithoutSaveLocal(action.payload);

      state.token = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setLocation: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        location: action.payload,
      };
    },
    logout: state => {
      state.token = '';
      state.userInfo = undefined;
      setIsDashboardDating(false);
    },
  },
});

export const {setToken, setUserInfo, logout, setLocation} =
  accountSlice.actions;
export default accountSlice.reducer;
