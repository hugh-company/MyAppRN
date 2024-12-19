import {createSlice} from '@reduxjs/toolkit';
import {UserInterface} from '@types';
import {APP_SLICE} from '../type';

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
      state.token = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: state => {
      state.token = '';
      state.userInfo = undefined;
    },
  },
});

export const {setToken, setUserInfo, logout} = accountSlice.actions;
export default accountSlice.reducer;
