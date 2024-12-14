import {addTask, deleteTask, getTaskListSelector, updateTask} from '@redux';
import {ItemTaskInterface} from '@types';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {TaskFormData} from '../../../validations/taskSchema';

export const useHome = () => {
  const {t} = useTranslation('home');
  const taskList = useSelector(getTaskListSelector);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [itemSelected, setItemSelected] = useState<ItemTaskInterface | null>(
    null,
  );

  console.log({taskList});
  const handleAddTask = (newTask: TaskFormData) => {
    dispatch(addTask(newTask));
  };
  const handleUpdateTask = (task: ItemTaskInterface) => {
    dispatch(updateTask(task));
  };
  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };
  const showModalEdit = (task: ItemTaskInterface) => {
    setItemSelected(task);
    setVisible(true);
  };
  return {
    t,
    taskList,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    visible,
    setVisible,
    itemSelected,
    setItemSelected,
    showModalEdit,
    visibleDetail,
    setVisibleDetail,
  };
};

export default useHome;
