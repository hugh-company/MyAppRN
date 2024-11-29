import {combineReducers} from 'redux';
import accountSlice from './slices/userSlice';
const rootReducer = combineReducers({
  accountSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
