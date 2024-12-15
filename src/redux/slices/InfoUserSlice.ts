import {createSlice} from '@reduxjs/toolkit';
import {APP_SLICE} from '../type';

const initialState = {
  infoUser: {},
} as {
  infoUser: {
    name: string;
    email: string;
  };
};

const infoUserSlice = createSlice({
  name: APP_SLICE.INFO_USER_SLICE,
  initialState,
  reducers: {
    setInfoUser: (state, action) => {
      state.infoUser = action.payload;
    },
  },
});

export const {setInfoUser} = infoUserSlice.actions;
export default infoUserSlice.reducer;
