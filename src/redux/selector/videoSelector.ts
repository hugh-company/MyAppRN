import {RootState} from '../store';

export const videoSettingsSelector = (state: RootState) =>
  state.videoSlice.settings;
