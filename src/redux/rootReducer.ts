import {combineReducers} from 'redux';
import taskSlice from './slices/taskSlice';
const rootReducer = combineReducers({
  taskSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
