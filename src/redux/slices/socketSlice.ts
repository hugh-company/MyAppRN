import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APP_SLICE} from '../type';

interface SocketState {
  socket: WebSocket | null;
  infoUser: {
    token: string;
    device_id: string;
  } | null;
}

const initialState: SocketState = {
  socket: null,
  infoUser: null,
};

const socketSlice = createSlice({
  name: APP_SLICE.SOCKET_SLICE,
  initialState,
  reducers: {
    // handle InfoUser
    setInfoUser(
      state,
      action: PayloadAction<{
        token: string;
        device_id: string;
      }>,
    ) {
      console.log(action);

      state.infoUser = action.payload;
    },
    setSocket(
      state,
      action: PayloadAction<{
        socket: WebSocket;
      }>,
    ) {
      state.socket = action.payload.socket;
    },
    clearSocketInfoUser(state) {
      state.socket = null;
      state.infoUser = null;
    },
  },
});

export const {
  setSocket,

  setInfoUser,
  clearSocketInfoUser,
} = socketSlice.actions;

export default socketSlice.reducer;
