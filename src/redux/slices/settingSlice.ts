import {createSlice} from '@reduxjs/toolkit';
import {APP_SLICE} from '../type';

const initialState = {
  hasSeenOnboarding: false,
} as {hasSeenOnboarding: boolean};

const settingSlice = createSlice({
  name: APP_SLICE.SETTING_SLICE,
  initialState,
  reducers: {
    setHasSeenOnboarding(state, action) {
      state.hasSeenOnboarding = action.payload;
    },
  },
});

export const {setHasSeenOnboarding} = settingSlice.actions;
export default settingSlice.reducer;
