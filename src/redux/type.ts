import {
  ConversationInterface,
  MessageItemInterface,
  UserInterface,
} from '@types';

export const APP_SLICE = {
  ACCOUNT_SLICE: 'ACCOUNT_SLICE',
  DATA_LOCAL_SLICE: 'DATA_LOCAL_SLICE',
  SETTING_SLICE: 'SETTING_SLICE',
  SOCKET_SLICE: 'SOCKET_SLICE',
  //
  CHAT_SLICE: 'CHAT_SLICE',
  SEARCH_MESSAGE_SLICE: 'SEARCH_MESSAGE_SLICE',
  SAVE_POST_SLICE: 'SAVE_POST_SLICE',
  VIDEO_SLICE: 'VIDEO_SLICE',
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
  messages: MessageItemInterface[];
  is_next: boolean;
  cursor_id: number;
}
// Add new interfaces for pagination actions
export interface IUpdateConversationsPayload {
  conversations: ConversationInterface[];
  cursor_time: string;
  is_next: boolean;
}
