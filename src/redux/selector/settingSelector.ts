import {RootState} from '../rootReducer';

export const drawerSettingSelector = (state: RootState) =>
  state.settingSlice.dataDrawer;
export const bottomNavigation = (state: RootState) =>
  state.settingSlice.bottomNavigation;
export const noticesSelector = (state: RootState) => state.settingSlice.notices;
export const isCloseNoticeSelector = (state: RootState) =>
  state.settingSlice.isCloseNotice;
export const isDashboardDatingSelector = (state: RootState) =>
  state.settingSlice.isDashboardDating;
export const stickersSelector = (state: RootState) =>
  state.settingSlice.stickers;
export const getGameTrendingLocal = (state: RootState) =>
  state.settingSlice.games_trending;
