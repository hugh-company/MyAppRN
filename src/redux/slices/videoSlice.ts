import {createSlice} from '@reduxjs/toolkit';
import {APP_SLICE} from '../type';

const initialState = {
  settings: {
    isMute: true,
    speed: 1,
  },
} as {
  settings: {
    isMute: boolean;
    speed: number;
  };
};

const videoSlice = createSlice({
  name: APP_SLICE.VIDEO_SLICE,
  initialState,
  reducers: {
    setMute: state => {
      state.settings.isMute = !state.settings.isMute;
    },
    setSpeed: (state, action) => {
      state.settings.speed = action.payload;
    },
  },
});

export const {setMute, setSpeed} = videoSlice.actions;
export default videoSlice.reducer;
