import {Background, Background2, Background3} from '@assets';

export type StatusTaskKey = 'todo' | 'inProgress' | 'done';
export type StatusTaskColor = '#FF0000' | '#00FF00' | '#0000FF' | '';
export type PriorityTaskKey = 'low' | 'medium' | 'high' | '';

export type TaskColor =
  | 'white'
  | '#FF0000'
  | '#00FF00'
  | '#0000FF'
  | ''
  | '#F65D79'
  | '#F7CC15';
export type BackgroundTaskKey =
  | typeof Background
  | typeof Background2
  | typeof Background3;
export interface StatusTaskInterface {
  value: StatusTaskKey;
  label: string;
  color: string;
  background: string;
}

export interface PriorityTaskInterface {
  key: PriorityTaskKey;
  title: string;
  color: string;
}

export interface ItemTaskInterface {
  id: string;
  title: string;
  status?: StatusTaskKey;
  deadline?: string;
  description?: string;
  priority?: PriorityTaskKey;
  color?: TaskColor;
  images?: string[];
  background?: string;
}
