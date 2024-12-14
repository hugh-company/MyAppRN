import {Background, Background2, Background3} from '@assets';
import {
  BackgroundTaskKey,
  PriorityTaskInterface,
  PriorityTaskKey,
  StatusTaskInterface,
  StatusTaskKey,
  TaskColor,
} from '@types';
import {t} from 'i18next';
export const colorBackgroundTask: TaskColor[] = [
  'white',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#F65D79',
  '#F7CC15',
];

export const backgroundTask: BackgroundTaskKey[] = [
  'background1',
  'background2',
  'background3',
];
export const statusTask: StatusTaskInterface[] = [
  {
    value: 'todo',
    label: t('home.todo'),
    color: '#FF5252',
    background: '#FFEBEE',
  },
  {
    value: 'inProgress',
    label: t('home.inProgress'),
    color: '#2196F3',
    background: '#E3F2FD',
  },
  {
    value: 'done',
    label: t('home.done'),
    color: '#4CAF50',
    background: '#E8F5E9',
  },
];
export const priorityTask: PriorityTaskInterface[] = [
  {
    key: 'low',
    title: t('home.low'),
    color: '#4CAF50',
  },
  {
    key: 'medium',
    title: t('home.medium'),
    color: '#FFA000',
  },
  {
    key: 'high',
    title: t('home.high'),
    color: '#F44336',
  },
];
export const getBackgroundTask = (uri?: BackgroundTaskKey) => {
  switch (uri) {
    case 'background1':
      return Background;
    case 'background2':
      return Background2;
    case 'background3':
      return Background3;
    default:
      return '';
  }
};

export const getStatusTask = (status?: StatusTaskKey) => {
  return statusTask.find(item => item.value === status);
};
export const getPriorityTask = (priority?: PriorityTaskKey) => {
  return priorityTask.find(item => item.key === priority);
};
