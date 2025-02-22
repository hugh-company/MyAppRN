import {RootState} from '../rootReducer';
export const getSocket = (state: RootState) => state.socketSlice.socket;
export const getDeviceIdStore = (state: RootState) =>
  state.socketSlice.infoUser?.device_id;
