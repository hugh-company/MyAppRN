import {createSlice} from '@reduxjs/toolkit';
import {APP_SLICE} from '../type';
import {AsyncStorage} from '@utils';

const initialState = {
  token: '',
  userProfile: null,
} as any;

const accountSlice = createSlice({
  name: APP_SLICE.ACCOUNT_SLICE,
  initialState,
  reducers: {
    setAccountToken(state, action) {
      state.token = action.payload;
    },
    setUserProfile(state, action) {
      state.userProfile = action.payload;
    },
    setToken(state, action) {
      AsyncStorage.set('token', action.payload);
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = '';
      AsyncStorage.delete('token');
      state.passcode.code = '';
      state.passcode.passcodeTime = null;
      AsyncStorage.delete('store_view_code');
      state.userProfile = {};
      state.restaurantInfo = {};
    },
  },
});

export const {setAccountToken, setUserProfile, setToken, clearToken} =
  accountSlice.actions;
export default accountSlice.reducer;
