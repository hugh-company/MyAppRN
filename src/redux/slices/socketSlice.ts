import {createSlice} from '@reduxjs/toolkit';
import {APP_SLICE} from '../type';

const initialState = {
  socket: null,
  conversations: [],
  messages: [],
  joinedConversation: 0,
} as {
  socket: any;
  conversations: any[];
  messages: any[];
  joinedConversation: number;
};

const socketSlice = createSlice({
  name: APP_SLICE.SOCKET_SLICE,
  initialState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload;
    },

    // conversations
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    updateConversation(state, action) {
      const itemConversation = action.payload;
      const index = state.conversations.findIndex(
        conversation => conversation.id === itemConversation.id,
      );
      if (index !== -1) {
        state.conversations[index] = itemConversation;
      } else {
        state.conversations.push(itemConversation);
      }
    },
    deleteConversation(state, action) {
      const id = action.payload;
      state.conversations = state.conversations.filter(
        conversation => conversation.id !== id,
      );
    },
    // messages
    setMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
      state.conversations = state.conversations.map(conversation => {
        if (conversation.id === action.payload.conversationId) {
          conversation.lastMessage = action.payload;
          conversation.unread += 1;
        }

        return conversation;
      });
    },
    updateMessageWithServer(state, action) {
      const message = action.payload;
      const index = state.messages.findIndex(item => item.id === message.id);
      if (index !== -1) {
        state.messages[index] = message;
      }
    },
    // actions socket
    readConversation(state, action) {
      const id = action.payload;
      const conversation = state.conversations.find(
        conversation => conversation.id === id,
      );
      if (conversation) {
        conversation.unread = 0;
      }
    },
    // join conversation
    joinConversation(state, action) {
      state.joinedConversation = action.payload;
    },
  },
});

export const {
  setSocket,
  setConversations,
  setMessages,

  joinConversation,
  updateConversation,
  deleteConversation,
  addMessage,
  updateMessageWithServer,
  readConversation,
} = socketSlice.actions;

export default socketSlice.reducer;
