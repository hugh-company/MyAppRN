import {createSlice} from '@reduxjs/toolkit';
import {ItemTaskInterface} from '@types';
import {generateId} from '@utils';
import {APP_SLICE} from '../type';

const initialState = {
  taskList: [],
} as {
  taskList: ItemTaskInterface[];
};

const taskSlice = createSlice({
  name: APP_SLICE.TASK_SLICE,
  initialState,
  reducers: {
    setTaskList: (state, action) => {
      state.taskList = action.payload;
    },
    addTask: (state, action) => {
      state.taskList = [
        ...state.taskList,
        {...action.payload, id: generateId()},
      ];
    },
    updateTask: (state, action) => {
      const index = state.taskList.findIndex(
        (task: ItemTaskInterface) => task.id === action.payload.id,
      );
      state.taskList[index] = action.payload;
    },
    deleteTask: (state, action) => {
      state.taskList = state.taskList.filter(
        (task: ItemTaskInterface) => task.id !== action.payload,
      );
    },
  },
});

export const {setTaskList, addTask, updateTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;
