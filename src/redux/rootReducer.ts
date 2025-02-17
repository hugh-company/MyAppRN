import {combineReducers} from 'redux';
import accountSlice from './slices/accountSlice';
import chatSlice from './slices/chatSlice';
import dataLocalSlide from './slices/dataLocalSlice';
import savedPostSlice from './slices/savedPostSlice';
import searchMessageSlice from './slices/searchMessageSlice';
import settingSlice from './slices/settingSlice';
import socketSlice from './slices/socketSlice';
const rootReducer = combineReducers({
  accountSlice,
  settingSlice,
  dataLocalSlide,
  socketSlice,
  chatSlice,
  searchMessageSlice,
  savedPostSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
