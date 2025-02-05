import {combineReducers} from 'redux';
import accountSlice from './slices/accountSlice';
import dataLocalSlide from './slices/dataLocalSlice';
import messageSlice from './slices/messageSlice';
import settingSlice from './slices/settingSlice';
import socketSlice from './slices/socketSlice';
const rootReducer = combineReducers({
  accountSlice,
  settingSlice,
  dataLocalSlide,
  messageSlice,
  socketSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
