import {createSlice} from '@reduxjs/toolkit';
import {
  ConversationInterface,
  MessageItemInterface,
  MessageStatus,
  OtherUser,
} from '@types';
import dayjs from 'dayjs';
import {APP_SLICE} from '../type';

interface chatState {
  conversation: {
    conversations: ConversationInterface[];
    cursor_time: string;
    is_next: boolean;
    isRefreshing?: boolean;
    isLoadMore?: boolean;
    loading?: boolean;
    error?: string | null;
  };
  message: {
    messages: MessageItemInterface[];
    is_next: boolean;
    cursor_id: number;
    loading?: boolean;
    error?: string | null;
    isRefreshing?: boolean;
    isLoadMore?: boolean;
  };
  joinedConversation: number;
  unsentMessages: any[];
  listUserOnline: OtherUser[];

  threadDetail: ConversationInterface | null;
}

const initialState: chatState = {
  conversation: {
    conversations: [],
    cursor_time: '',
    is_next: false,
    isRefreshing: false,
    isLoadMore: false,
    loading: false,
    error: null,
  },
  message: {
    messages: [],
    is_next: false,
    cursor_id: 0,
    loading: true,
    error: null,
  },
  joinedConversation: 0,
  unsentMessages: [],
  listUserOnline: [],
  threadDetail: null,
};

const chatSlice = createSlice({
  name: APP_SLICE.CHAT_SLICE,
  initialState,
  reducers: {
    setConversation(state, action) {
      state.conversation.conversations = action.payload.conversations;
      state.conversation.cursor_time = action.payload.cursor_time;
      state.conversation.is_next = action.payload.is_next;
      state.conversation.isRefreshing = false;
      state.conversation.isLoadMore = false;
      state.conversation.loading = false;
    },
    setConversationLoading(state) {
      state.conversation.loading = true;
    },
    setConversationRefreshing(state) {
      state.conversation.isRefreshing = true;
    },
    setConversationLoadMore(state) {
      state.conversation.isLoadMore = true;
    },
    setConversationError(state, action) {
      state.conversation.error = action.payload;
      state.conversation.loading = false;
      state.conversation.isRefreshing = false;
      state.conversation.isLoadMore = false;
    },
    loadMoreConversations(state, action) {
      state.conversation.conversations = [
        ...state.conversation.conversations,
        ...action.payload.conversations,
      ];
      state.conversation.cursor_time = action.payload.cursor_time;
      state.conversation.is_next = action.payload.is_next;
      state.conversation.isLoadMore = false;
    },
    refreshConversations(state, action) {
      state.conversation.conversations = action.payload.conversations;
      state.conversation.cursor_time = action.payload.cursor_time;
      state.conversation.is_next = action.payload.is_next;
      state.conversation.isRefreshing = false;
    },
    //
    setLoadingMessage(state) {
      console.log('sdsdadsadsdas');

      state.message.loading = true;
    },
    setLoadMoreMessage(state) {
      state.message.isLoadMore = true;
    },
    loadMoreMessages(state, action) {
      state.message.messages = [
        ...state.message.messages,
        ...action.payload.messages,
      ];
      state.message.cursor_id = action.payload.cursor_id;
      state.message.is_next = action.payload.is_next;
      state.message.isLoadMore = false;
    },
    refreshMessages(state, action) {
      state.message.messages = action.payload.messages;
      state.message.cursor_id = action.payload.cursor_id;
      state.message.is_next = action.payload.is_next;
      state.message.isRefreshing = false;
    },
    setMessage(state, action) {
      state.message.messages = action.payload.messages;
      state.message.cursor_id = action.payload.cursor_id;
      state.message.is_next = action.payload.is_next;
      state.message.isRefreshing = false;
      state.message.isLoadMore = false;
      state.message.loading = false;
    },
    setMessageLoading(state) {
      state.message.loading = true;
    },
    setMessageRefreshing(state) {
      state.message.isRefreshing = true;
    },
    setMessageLoadMore(state) {
      state.message.isLoadMore = true;
    },
    setMessageError(state, action) {
      state.message.error = action.payload;
      state.message.loading = false;
      state.message.isRefreshing = false;
      state.message.isLoadMore = false;
    },

    // handle new message
    updateNewMessage(state, action) {
      const indexConversation = state.conversation.conversations.findIndex(
        item => item.thread_id === action.payload?.message.thread_id,
      );
      console.log({indexConversation});
      // add to unsent message
      if (indexConversation >= 0) {
        state.conversation.conversations[indexConversation].last_message =
          action.payload?.message;
        state.conversation.conversations[
          indexConversation
        ].last_message.content.created_at = action.payload?.message.created_at;

        // Move the conversation to the top
        const updatedConversation = state.conversation.conversations.splice(
          indexConversation,
          1,
        )[0];
        console.log({updatedConversation});

        state.conversation.conversations.unshift(updatedConversation);
      }

      //  update message list
      // check message
      const index = state.message.messages.findIndex(
        item => item.id === action.payload?.message.temp_id,
      );
      if (index >= 0) {
        state.message.messages[index] = {
          ...state.message.messages[index],
          ...action.payload,
          id: action.payload.message.message_id,
          content: {
            ...state.message.messages[index].content,
            created_at: action.payload.message.created_at,
            status: action.payload.message.status,
          },
        };
      } else {
        state.message.messages = [
          action.payload.message,
          ...state.message.messages,
        ];
      }

      if (!action.payload?.message.created_at) {
        action.payload.message.content.created_at = dayjs().format(
          'YYYY-MM-DD HH:mm:ss',
        );
      }
    },
    updateNewMessageLocal(state, action) {
      const indexConversation = state.conversation.conversations.findIndex(
        item => item.thread_id === action.payload?.message.thread_id,
      );
      console.log({indexConversation});
      // add to unsent message
      state.unsentMessages.push(action.payload.message);
      if (indexConversation >= 0) {
        state.conversation.conversations[indexConversation].last_message =
          action.payload?.message;
        state.conversation.conversations[
          indexConversation
        ].last_message.content.created_at = action.payload?.message.created_at;

        // Move the conversation to the top
        const updatedConversation = state.conversation.conversations.splice(
          indexConversation,
          1,
        )[0];
        console.log({updatedConversation});

        state.conversation.conversations.unshift(updatedConversation);
      }

      //  update message list
      // check message

      state.message.messages = [
        action.payload.message,
        ...state.message.messages,
      ];

      if (!action.payload?.message.created_at) {
        action.payload.message.content.created_at = dayjs().format(
          'YYYY-MM-DD HH:mm:ss',
        );
      }
    },
    addNewConversation(state, action) {
      console.log('addNewConversation', action.payload);
      state.conversation.conversations = [
        action.payload,
        ...state.conversation.conversations,
      ];
    },
    updateMessageSent(state, action) {
      const index = state.message.messages.findIndex(
        item => item.id === action.payload?.message.temp_id,
      );
      // check if the message is unsent

      const unsentIndex = state.unsentMessages.findIndex(
        message => message.id === action.payload.message.temp_id,
      );
      console.log({unsentIndex});
      if (unsentIndex >= 0) {
        state.unsentMessages.splice(unsentIndex, 1);
      }
      // update conversation
      const indexConversation = state.conversation.conversations.findIndex(
        item => item.thread_id === action.payload?.message.thread_id,
      );
      console.log({index}, action.payload.message, action.payload.temp_id);

      if (index >= 0) {
        state.message.messages[index] = {
          ...state.message.messages[index],
          ...action.payload,
          id: action.payload.message.message_id,
          content: {
            ...state.message.messages[index].content,
            created_at: action.payload.message.created_at,
            status: action.payload.message.status,
          },
        };
      }
      console.log(
        'updateMessageSent',
        action.payload,
        action.payload.temp_id,
        indexConversation,
        {
          index,
        },
      );
      if (indexConversation >= 0 && index >= 0) {
        state.conversation.conversations[indexConversation].last_message = {
          ...state.message.messages[index],
          ...action.payload.message,
          id: action.payload.message.message_id,
        };
        state.conversation.conversations[
          indexConversation
        ].last_message.content.created_at = action.payload.message.created_at;

        // Move the conversation to the top
        const updatedConversation = state.conversation.conversations.splice(
          indexConversation,
          1,
        )[0];
        state.conversation.conversations.unshift(updatedConversation);
      }
      if (!action.payload?.message.created_at) {
        action.payload.message.created_at = dayjs().format(
          'YYYY-MM-DD HH:mm:ss',
        );
      }
    },
    // read all messages in conversation
    readAllMessagesConversions(state, action) {
      state.joinedConversation = action.payload?.thread_id;
      const index = state.conversation.conversations.findIndex(
        item => item.thread_id === action.payload?.thread_id,
      );
      if (index >= 0) {
        state.conversation.conversations[index].last_message.content.status =
          MessageStatus.READ;
      }
    },

    readAllMessagesWithRoom(state, action) {
      state.joinedConversation = action.payload?.thread_id;

      state.message.messages = state.message?.messages.map(message => {
        if (message.thread_id === action.payload?.thread_id) {
          return {
            ...message,
            content: {
              ...message.content,
              status: MessageStatus.READ,
            },
          };
        }
        return message;
      });
    },
    // ...other reducers...
    setJoinedConversation(state, action) {
      state.joinedConversation = action.payload;
    },
    addUnsentMessage(state, action) {
      state.unsentMessages.push(action.payload);
    },
    removeUnsentMessage(state, action) {
      state.unsentMessages = state.unsentMessages.filter(
        message => message.id !== action.payload.id,
      );
    },
    clearAllUnSentMessage(state) {
      state.unsentMessages = [];
    },

    clearAllChat(state) {
      state.conversation = {
        conversations: [],
        cursor_time: '',
        is_next: false,
        isRefreshing: false,
        isLoadMore: false,
        loading: false,
        error: null,
      };
      state.message = {
        messages: [],
        is_next: false,
        cursor_id: 0,
        loading: true,
        error: null,
      };
      state.joinedConversation = 0;
      state.unsentMessages = [];
      state.listUserOnline = [];
    },
    setListUserOnline(state, action) {
      state.listUserOnline = action.payload;
    },
    userOnline(state, action) {
      const indexUser = state.listUserOnline.findIndex(
        user => user.id === action.payload.id,
      );
      if (indexUser >= 0) {
        state.listUserOnline[indexUser].online = true;
      } else {
        state.listUserOnline = [...state.listUserOnline, action.payload];
      }

      // update with conversation
      const indexConversation = state.conversation.conversations.findIndex(
        item => item.other_user.id === action.payload.id,
      );
      if (indexConversation >= 0) {
        state.conversation.conversations[indexConversation].other_user.online =
          true;
      }
    },
    userOffline(state, action) {
      state.listUserOnline = state.listUserOnline.filter(
        user => user.id !== action.payload.id,
      );
      // update with conversation
      const indexConversation = state.conversation.conversations.findIndex(
        item => item.other_user.id === action.payload.id,
      );
      if (indexConversation >= 0) {
        state.conversation.conversations[indexConversation].other_user.online =
          false;
      }
    },

    //
    setDetailThread(state, action) {
      state.threadDetail = action.payload;
    },
    //
  },
});

export const {
  setConversation,
  setJoinedConversation,
  setConversationLoading,
  setConversationRefreshing,
  setConversationLoadMore,
  setConversationError,
  loadMoreConversations,
  refreshConversations,
  loadMoreMessages,
  refreshMessages,
  setMessage,
  setMessageLoading,
  setMessageRefreshing,
  setMessageLoadMore,
  setMessageError,
  updateNewMessage,
  readAllMessagesConversions,
  readAllMessagesWithRoom,
  updateMessageSent,
  addNewConversation,
  addUnsentMessage,
  removeUnsentMessage,
  setLoadingMessage,
  clearAllUnSentMessage,
  clearAllChat,
  setListUserOnline,
  userOnline,
  userOffline,
  setLoadMoreMessage,
  setDetailThread,
  // ...other actions...
} = chatSlice.actions;

export default chatSlice.reducer;
// handle Conversations
export const fetchConversationsSaga = (params?: any) => ({
  type: 'FETCH_CONVERSATION_DATA',
  payload: params,
});
export const loadMoreConversationsSaga = (params?: any) => ({
  type: 'LOAD_MORE_CONVERSATIONS',
  payload: params,
});
export const refreshConversationsSaga = (params?: any) => ({
  type: 'REFRESH_CONVERSATIONS',
  payload: params,
});

// handle Messages
export const sendMessageSaga = (params?: any) => ({
  type: 'SEND_MESSAGE',
  payload: params,
});
export const fetchMessagesSaga = (params?: any) => ({
  type: 'FETCH_MESSAGES_DATA',
  payload: params,
});
export const fetchDetailThreadSaga = (params?: any) => ({
  type: 'FETCH_DETAIL_THREAD',
  payload: params,
});
export const loadMoreMessagesSaga = (params?: any) => ({
  type: 'LOAD_MORE_MESSAGES',
  payload: params,
});
export const refreshMessagesSaga = (params?: any) => ({
  type: 'REFRESH_MESSAGES',
  payload: params,
});

// other actions
export const joinConversationSaga = (params?: any) => ({
  type: 'JOIN_CONVERSATION',
  payload: params,
});
export const markMessageAsReadSaga = (params?: any) => ({
  type: 'MARK_MESSAGE_AS_READ',
  payload: params,
});
export const sendTypingIndicatorSaga = (params?: any) => ({
  type: 'SEND_TYPING_INDICATOR',
  payload: params,
});

// ...other actions...
export const sendMatchSaga = (params?: any) => ({
  type: 'SEND_MATCH_ACTION',
  payload: params,
});
// fetch user online
export const fetchUserOnlineSaga = (params?: any) => ({
  type: 'FETCH_USER_ONLINE',
  payload: params,
});
