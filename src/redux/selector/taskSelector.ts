import {RootState} from '../store';
export const getTaskListSelector = (state: RootState) =>
  state.taskSlice.taskList;
