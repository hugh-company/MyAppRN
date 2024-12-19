import {UserInterface} from '@types';

export const APP_SLICE = {
  ACCOUNT_SLICE: 'ACCOUNT_SLICE',
};
export interface IAccount {
  token: string;
  userInfo: UserInterface;
}
