export interface MessageItem {
  id: number;
  name: string;
  user: {
    id: number;
    name: string;
    avatar: string;
    status?: boolean;
  };
  message: {
    id: number;
    content: string;
    time: string;
    isRead: boolean;
  };
  count?: number;
}
