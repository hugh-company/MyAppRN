import {createSlice} from '@reduxjs/toolkit';
import {APP_SLICE} from '../type';

const initialState = {
  notices: {},
  isCloseNotice: false,
  menuNavigation: [],
} as {
  notices: any;
  menuNavigation: any[];
};

const settingSlice = createSlice({
  name: APP_SLICE.ACCOUNT_SLICE,
  initialState,
  reducers: {
    setNotices: (state, action) => {
      state.notices = action.payload;
    },
  },
});

export const {} = settingSlice.actions;
export default settingSlice.reducer;
