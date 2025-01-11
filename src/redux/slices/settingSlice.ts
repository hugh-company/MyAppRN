import {createSlice} from '@reduxjs/toolkit';
import {menuNavigationInterface, NotificationInterface} from '@types';
import {APP_SLICE} from '../type';

const initialState = {
  notices: [],
  isCloseNotice: false,
  bottomNavigation: [],
  dataDrawer: [],
} as {
  isCloseNotice: boolean;
  notices: NotificationInterface[];
  bottomNavigation: menuNavigationInterface[];
  dataDrawer: menuNavigationInterface[];
};

const settingSlice = createSlice({
  name: APP_SLICE.ACCOUNT_SLICE,
  initialState,
  reducers: {
    setDataSetting: (state, action) => {
      console.log({action: action.payload});

      state.notices = action.payload.notices;
      state.bottomNavigation = action.payload.menuNavigation;
      state.dataDrawer = action.payload.dataDrawer;
    },
    setNotices: (state, action) => {
      state.notices = action.payload;
    },
    setBottomNavigation: (state, action) => {
      state.bottomNavigation = action.payload;
    },
    setDataDrawer: (state, action) => {
      state.dataDrawer = action.payload;
    },
  },
});

export const {setNotices, setBottomNavigation, setDataDrawer, setDataSetting} =
  settingSlice.actions;
export default settingSlice.reducer;
