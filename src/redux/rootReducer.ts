import {combineReducers} from 'redux';
import infoUserSlice from './slices/InfoUserSlice';
const rootReducer = combineReducers({
  infoUserSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
