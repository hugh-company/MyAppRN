import {combineReducers} from 'redux';
import accountSlice from './slices/accountSlice';
import dataLocalSlide from './slices/dataLocalSlice';
import settingSlice from './slices/settingSlice';
const rootReducer = combineReducers({
  accountSlice,
  settingSlice,
  dataLocalSlide,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
