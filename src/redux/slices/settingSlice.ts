import {createSlice} from '@reduxjs/toolkit';
import {
  ItemListProduct,
  menuNavigationInterface,
  NotificationInterface,
  StickerInterface,
} from '@types';
import {APP_SLICE} from '../type';

const initialState = {
  notices: [],
  isCloseNotice: false,
  bottomNavigation: [],
  dataDrawer: [],
  isDashboardDating: false,
  // new
  stickers: [],
  games_trending: [],
} as {
  isCloseNotice: boolean;
  notices: NotificationInterface[];
  bottomNavigation: menuNavigationInterface[];
  dataDrawer: menuNavigationInterface[];

  isDashboardDating: boolean;
  // new
  stickers: StickerInterface[];

  games_trending: ItemListProduct[];
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
    //
    setStickers: (state, action) => {
      state.stickers = action.payload;
    },
    //game trending
    setGamesTrending(state, action) {
      state.games_trending = action.payload;
    },
  },
});

export const {
  setNotices,
  setBottomNavigation,
  setDataDrawer,
  setDataSetting,
  setIsDashboardDating,
  setStickers,
  setGamesTrending,
} = settingSlice.actions;
export default settingSlice.reducer;
