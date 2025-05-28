import {RootState} from '../store';

export const getHasSeenOnboarding = (state: RootState) =>
  state.settingSlice.hasSeenOnboarding;
