import {ItemListProduct} from './post.type';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  GAME = 'game',
  ICON = 'icon',
}
export enum MessageStatus {
  SENT = 'sent',
  //
  RECEIVED = 'received',
  //
  SEEN = 'seen',
  READ = 'read',
  SENDING = 'sending',

  ERROR = 'error',
}
export enum MessageAction {
  GET_THREAD = 'get_threads',
  GET_MESSAGES = 'get_messages',
  NEW_THREAD = 'new_thread',
  NEW_MESSAGE = 'new_message',
  SEND_MESSAGE = 'send_message',
  GET_USER_STATUS = 'get_user_status',
  SET_STATUS = 'set_status',
  SET_JOIN_THREAD = 'set_join_thread',
  GET_THREAD_DETAIL = 'get_thread',
  SEND_NOTICE_READ = 'send_notice_read',
  SET_NOTICE_TYPING = 'set_notice_typing',
  SEND_MATCH_ACTION = 'send_match_action',
  MESSAGE_SENT = 'message_sent',
  SEARCH_MESSAGE = 'search_threads',
  USER_ONLINE = 'get_online_list',
  NOITE_ONLINE = 'notice_online',
  NOTICE_OFFLINE = 'notice_offline',

  //
  NOTIFICATION = 'notification',
}
export interface ChatInterface {
  id: number;
  userid: number;
  recive_userid: number;
  content: {
    type: MessageType;
    text: string;
    images: string[];
    game: string;
    icon: string;
    status: MessageStatus;
    time_created: string;
    time_updated: string;
  };
  reply: {
    type: MessageType;
    text: string;
    images?: string[];
    game?: string;
    icon?: string;
    status: MessageStatus;
    time_created: string;
    time_updated: string;
  };
}
// new type
export interface MessageItemInterface {
  id: string;
  sender_id: number;
  recipient_id: number;
  content: Content;
  thread_id: number | string;
}

export interface Content {
  type: string;
  data: Data;
  replyto: MessageItemInterface;
  status: MessageStatus;
  created_at: string;
}

export interface Data {
  text: string;
  games: ItemListProduct[];
  images?: string[];
  images_count: number;
  sticker: string;
}

export interface OtherUser {
  id: number;
  fullname: string;
  avatar: string;
  online: boolean;
}
export interface ConversationInterface {
  id: number;
  thread_id: number;
  isread: boolean;
  updated_at: string;
  created_at: string;
  last_message: MessageItemInterface;
  other_user: OtherUser;
}
