export interface MessageItem {
  conversation_id: number;
  sender_id: number;
  recipient_avatar: string;
  recipient_fullname: string;
  last_message: {
    id: number;
    sender_id: number;
    recipient_id: number;
    content: {
      type: MessageType;
      data: string;
      status: MessageStatus;
      time_send: string;
    };
  };
  unread_count: number;
}
export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  GAME = 'game',
  ICON = 'icon',
}
export enum MessageStatus {
  SENT = 'sent',
  RECEIVED = 'received',
  SEEN = 'seen',
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

export interface ConversationInterface {}
