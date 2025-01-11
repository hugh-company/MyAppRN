import {combineReducers} from 'redux';
import accountSlice from './slices/accountSlice';
import settingSlice from './slices/settingSlice';
const rootReducer = combineReducers({
  accountSlice,
  settingSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
