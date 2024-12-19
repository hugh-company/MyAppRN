import {combineReducers} from 'redux';
import accountSlice from './slices/accountSlice';
const rootReducer = combineReducers({
  accountSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
