import {ConversationInterface, MessageItem, UserInterface} from '@types';

export const APP_SLICE = {
  ACCOUNT_SLICE: 'ACCOUNT_SLICE',
  DATA_LOCAL_SLICE: 'DATA_LOCAL_SLICE',
  SETTING_SLICE: 'SETTING_SLICE',
  SOCKET_SLICE: 'SOCKET_SLICE',
};
export interface IAccount {
  token: string;
  userInfo: UserInterface;
}
export interface IConversationSlice {
  conversations: ConversationInterface[];
  cursor_time: string;
  is_next: boolean;
}
export interface IMessageSlice {
  messages: MessageItem[];
  is_next: boolean;
  cursor_id: number;
}
