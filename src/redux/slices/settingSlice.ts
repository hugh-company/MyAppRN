import {createSlice} from '@reduxjs/toolkit';
import {menuNavigationInterface, NotificationInterface} from '@types';
import {APP_SLICE} from '../type';

const initialState = {
  notices: [],
  isCloseNotice: false,
  bottomNavigation: [],
  dataDrawer: [],
  isDashboardDating: false,
} as {
  isCloseNotice: boolean;
  notices: NotificationInterface[];
  bottomNavigation: menuNavigationInterface[];
  dataDrawer: menuNavigationInterface[];

  isDashboardDating: boolean;
};

const settingSlice = createSlice({
  name: APP_SLICE.ACCOUNT_SLICE,
  initialState,
  reducers: {
    setDataSetting: (state, action) => {
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
    setIsDashboardDating: (state, action) => {
      state.isDashboardDating = action.payload;
    },
  },
});

export const {
  setNotices,
  setBottomNavigation,
  setDataDrawer,
  setDataSetting,
  setIsDashboardDating,
} = settingSlice.actions;
export default settingSlice.reducer;
