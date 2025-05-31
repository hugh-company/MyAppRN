import {combineReducers} from 'redux';
import accountSlice from './slices/accountSlice';
import cartSlice from './slices/cartSlice';
import settingSlice from './slices/settingSlice';

const rootReducer = combineReducers({
  accountSlice,
  settingSlice,
  cartSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
