import NetInfo from '@react-native-community/netinfo';
import {
  addNewConversation,
  loadMoreConversations,
  loadMoreMessages,
  loadMoreSearchConversationsSuccess,
  readAllMessages,
  refreshConversations,
  refreshMessages,
  searchThreadsSuccess,
  setConversation,
  setInfoUser,
  setLoadingMessage,
  setMessage,
  setSocket,
  updateMessageSent,
  updateNewMessage,
} from '@redux';
import {PayloadAction} from '@reduxjs/toolkit';
import {ConversationInterface, MessageAction} from '@types';
import {eventChannel, EventChannel} from 'redux-saga';
import {
  all,
  call,
  delay,
  fork,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

const WEBSOCKET_URL = 'wss://oninapp.com/ws/';
let messageQueue: any[] = [];

interface SocketEventPayload {
  action: MessageAction;
  cursor_time: string;
  is_next: boolean;
  thread_id: string;
  data?: ConversationInterface[];
  message?: any;
  thread?: any;
}

// Helper function to safely send messages
function safeSend(socket: WebSocket, message: any) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    messageQueue.push(message);
  }
}

function* handleSocketOpen(
  socket: WebSocket,
  token: string,
): Generator<any, void, any> {
  console.log('WebSocket connected - handleSocketOpen');
  yield fork(reSendConnect, socket, token); // Use fork to run reSendConnect in the background
  yield put({type: 'FETCH_CONVERSATION_DATA', payload: {cursor_time: ''}}); // Dispatch an action to fetch conversations
  // Resend unsent messages
  const unsentMessages = yield select(state => state.chatSlice.unsentMessages);
  console.log({unsentMessages});

  for (const message of unsentMessages || []) {
    safeSend(socket, message);
    yield delay(500); // Add a delay of 500ms between each message
  }

  // Send messages from the queue
  while (messageQueue.length > 0) {
    const queuedMessage = messageQueue.shift();
    safeSend(socket, queuedMessage);
    yield delay(500);
  }
}

function createSocketChannel(
  socket: WebSocket,
  token: string,
): EventChannel<any> {
  return eventChannel(emit => {
    socket.onopen = () => {
      console.log('WebSocket connected', socket, token);
      emit({type: 'SOCKET_OPEN', socket, token});
    };

    socket.onclose = function (event) {
      console.log('WebSocket disconnected', event);
      emit({type: 'SOCKET_CLOSED'});
    };

    socket.onerror = function (error) {
      console.log({error});

      // console.error('WebSocket error', error);
    };

    socket.onmessage = event => {
      const data: SocketEventPayload = JSON.parse(event.data);
      console.log({message: data});
      emit({type: 'SOCKET_ON_MESSAGE', data});
    };
    return () => {
      socket.close();
    };
  });
}

function* handleDataMessage(data: SocketEventPayload) {
  // const infoUser = yield select(
  //   (state: any) => state.socketSlice.infoUser,
  // );
  console.log('handleDataMessage', data);
  if (data?.error === 'disconnect') {
    yield put({type: 'RECONNECT_SOCKET'});
  }

  if (data?.action === MessageAction.GET_THREAD) {
    const {isLoadMore, isRefreshing} = yield select(
      (state: any) => state.chatSlice.conversation,
    );

    if (isLoadMore) {
      yield put(
        loadMoreConversations({
          conversations: data.data,
          cursor_time: data.cursor_time,
          is_next: data.is_next,
        }),
      );
    } else if (isRefreshing) {
      yield put(
        refreshConversations({
          conversations: data.data,
          cursor_time: data.cursor_time,
          is_next: data.is_next,
        }),
      );
    } else {
      yield put(
        setConversation({
          conversations: data.data,
          cursor_time: data.cursor_time,
          is_next: data.is_next,
        }),
      );
    }
  }
  if (data?.action === MessageAction.GET_MESSAGES) {
    const {isLoadMore, isRefreshing} = yield select(
      (state: any) => state.chatSlice.message,
    );

    console.log({data: data.data});

    if (isLoadMore) {
      yield put(
        loadMoreMessages({
          messages: data.data,
          cursor_id: data.cursor_time,
          is_next: data.is_next,
        }),
      );
    } else if (isRefreshing) {
      yield put(
        refreshMessages({
          messages: data.data,
          cursor_id: data.cursor_time,
          is_next: data.is_next,
        }),
      );
    } else {
      yield put(
        setMessage({
          messages: data.data,
          cursor_id: data.cursor_time,
          is_next: data.is_next,
        }),
      );
    }
  }
  if (data?.action === MessageAction.SET_JOIN_THREAD) {
    yield put(readAllMessages({thread_id: data.thread_id}));
  }
  if (data?.action === MessageAction.NEW_MESSAGE) {
    yield put(updateNewMessage(data));
  }
  if (data?.action === MessageAction.NEW_THREAD) {
    yield put(addNewConversation(data?.thread));
  }
  if (data?.action === MessageAction.MESSAGE_SENT) {
    yield put(updateMessageSent({message: data}));
  }
  if (data?.action === MessageAction.SEARCH_MESSAGE) {
    const {isLoadMore} = yield select((state: any) => state.searchMessageSlice);
    if (isLoadMore) {
      yield put(
        loadMoreSearchConversationsSuccess({
          conversations: data.data,
          cursor_time: data.cursor_time,
          is_next: data.is_next,
        }),
      );
    } else {
      yield put(
        searchThreadsSuccess({
          conversations: data.data,
          cursor_time: data.cursor_time,
          is_next: data.is_next,
        }),
      );
    }
  }
}

function* handleCloseSocket(): Generator<any, void, any> {
  const unsentMessages = yield select(state => state.chatSlice.unsentMessages);
  for (const message of unsentMessages) {
    // yield put(
    //   updateMessageStatus({id: message.id, status: MessageStatus.ERROR}),
    // );
  }
}

function* handleSocketClosed() {
  console.log('WebSocket closed, attempting to reconnect...');
  yield put({type: 'RECONNECT_SOCKET'});
}

function* handleSocketEvents(
  socket: WebSocket,
  token: string,
): Generator<any, void, any> {
  const socketChannel = yield call(createSocketChannel, socket, token);
  yield takeEvery(socketChannel, function* (action: any) {
    if (action.type === 'SOCKET_OPEN') {
      yield call(handleSocketOpen, action.socket, action.token);
    }
    if (action.type === 'SOCKET_CLOSED') {
      yield call(handleSocketClosed); // Call the new saga to handle reconnection
    }
    if (action.type === 'SOCKET_ON_MESSAGE') {
      yield call(handleDataMessage, action.data);
    } else {
      yield put(action);
    }
  });
}

function* watchSetSocket() {
  yield takeEvery(setInfoUser.type, function* (action) {
    console.log('test');

    const {token, device_id} = action.payload;
    console.log({action});

    const socket: WebSocket = new WebSocket(
      `${WEBSOCKET_URL}?token=${token}&device_id=${device_id}`,
    );
    console.log({socket});
    yield put(setSocket({socket}));

    yield call(handleSocketEvents, socket, token);
  });
}

// conversation
function* fetchConversationsSaga(
  action: PayloadAction<{cursor_time: string}>,
): Generator<any, void, any> {
  const {cursor_time} = action.payload;
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  const params = {
    token: token,
    action: 'get_threads',
    cursor_time: '',
  };
  console.log('fetchConversationsSaga', {params});
  safeSend(socket, params);
}
// re-send connect
function* reSendConnect(socket: WebSocket, token: string) {
  while (true) {
    yield delay(55000); // Change delay to 55 seconds

    const params = {
      token: token,
      action: 'set_status',
    };
    console.log('Sending heartbeat');

    safeSend(socket, params);
  }
}

// message
function* fetchMessagesSaga(
  action: PayloadAction<{thread_id?: string; recipient_id?: string}>,
): Generator<any, void, any> {
  console.log('fetchMessagesSaga');
  yield put(setLoadingMessage());

  const {thread_id, recipient_id} = action.payload;
  const socket = yield select(state => state.socketSlice.socket);
  const token = yield select(state => state.socketSlice.infoUser.token);
  const params: any = {
    token: token,
    action: MessageAction.GET_MESSAGES,
  };
  console.log({thread_id, recipient_id});
  if (thread_id) {
    params.thread_id = thread_id;
  }
  if (recipient_id) {
    params.recipient_id = recipient_id;
  }
  console.log('fetchMessagesSaga', {params});

  safeSend(socket, params);
}
// send message to socket
function* sendMessageSaga(action: any): Generator<any, void, any> {
  const message = action.payload;
  console.log({sendMessageSaga: message});

  const socket = yield select(state => state.socketSlice.socket);
  try {
    safeSend(socket, message);
  } catch (error) {
    console.error('Message sending failed', error);
  }
}

// check user online status
function* checkUserStatusSaga(
  action: PayloadAction<{user_id: number}>,
): Generator<any, void, any> {
  const {user_id} = action.payload;
  const socket = yield select(state => state.socketSlice.socket);
  const token = yield select(state => state.socketSlice.infoUser.token);
  socket.send(
    JSON.stringify({
      action: 'get_user_status',
      token: token,
      user_id: user_id,
    }),
  );
}

// send heartbeat/ping
function* sendHeartbeatSaga(): Generator<any, void, any> {
  const socket = yield select(state => state.socketSlice.socket);
  const token = yield select(state => state.socketSlice.infoUser.token);
  socket.send(
    JSON.stringify({
      action: 'set_status',
      token: token,
    }),
  );
}

// mark message as read
function* markMessageAsReadSaga(
  action: PayloadAction<{message_id: number}>,
): Generator<any, void, any> {
  const {message_id} = action.payload;
  const socket = yield select(state => state.socketSlice.socket);
  const token = yield select(state => state.socketSlice.infoUser.token);
  socket.send(
    JSON.stringify({
      action: 'send_notice_read',
      token: token,
      message_id: message_id,
    }),
  );
}

// send typing indicator
function* sendTypingIndicatorSaga(
  action: PayloadAction<{recipient_id: number; typing: boolean}>,
): Generator<any, void, any> {
  const {recipient_id, typing} = action.payload;
  const socket = yield select(state => state.socketSlice.socket);
  const token = yield select(state => state.socketSlice.infoUser.token);
  socket.send(
    JSON.stringify({
      action: 'set_notice_typing',
      token: token,
      recipient_id: recipient_id,
      typing: typing,
    }),
  );
}

// send match action
function* sendMatchActionSaga(
  action: PayloadAction<{recipient_id: number; relation_type: string}>,
): Generator<any, void, any> {
  const {recipient_id, relation_type} = action.payload;
  const socket = yield select(state => state.socketSlice.socket);
  const token = yield select(state => state.socketSlice.infoUser.token);

  console.log({
    action: 'send_match_action',
    token: token,
    recipient_id: recipient_id,
    relation_type: relation_type,
  });

  socket.send(
    JSON.stringify({
      action: 'send_match_action',
      token: token,
      recipient_id: recipient_id,
      relation_type: relation_type,
    }),
  );
}

// join conversation
function* joinConversationSaga(
  action: PayloadAction<{thread_id?: string; recipient_id?: number}>,
): Generator<any, void, any> {
  const {thread_id, recipient_id} = action.payload;
  const socket = yield select(state => state.socketSlice.socket);
  const token = yield select(state => state.socketSlice.infoUser.token);
  console.log('joinConversationSaga', {thread_id});
  const params: any = {
    action: 'set_join_thread',
    token: token,
  };
  if (thread_id) {
    params.thread_id = thread_id;
  }
  if (recipient_id) {
    params.recipient_id = recipient_id;
  }
  console.log({params});

  socket.send(JSON.stringify(params));
}

// load more conversations
function* loadMoreConversationsSaga(
  action: PayloadAction<{cursor_time: string}>,
): Generator<any, void, any> {
  const {cursor_time} = action.payload;
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  const params = {
    token: token,
    action: 'get_threads',
    cursor_time: cursor_time,
  };
  socket.send(JSON.stringify(params));
}

// load more messages
function* loadMoreMessagesSaga(
  action: PayloadAction<{thread_id: string; cursor_id: number}>,
): Generator<any, void, any> {
  const {thread_id, cursor_id} = action.payload;
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  const params = {
    token: token,
    action: MessageAction.GET_MESSAGES,
    thread_id: thread_id,
    cursor_id: cursor_id,
  };
  socket.send(JSON.stringify(params));
}

function* refreshConversationsSaga(): Generator<any, void, any> {
  console.log('refreshConversationsSaga');
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  const params = {
    token: token,
    action: 'get_threads',
    cursor_time: '',
  };

  socket.send(JSON.stringify(params));
}
// search threads
function* searchThreadsSaga(
  action: PayloadAction<{key: string; cursor: string}>,
): Generator<any, void, any> {
  const {key, cursor} = action.payload;
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  const params = {
    token: token,
    action: 'search_threads',
    key: key,
    cursor: cursor,
  };
  console.log({params});

  socket.send(JSON.stringify(params));
}
function* loadMoreSearchConversationsSaga(
  action: PayloadAction<{cursor_time: string}>,
): Generator<any, void, any> {
  const {cursor_time} = action.payload;
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  const params = {
    token: token,
    action: 'search_threads',
    cursor_time: cursor_time,
  };
  socket.send(JSON.stringify(params));
}

function* reconnectSocketSaga(): Generator<any, void, any> {
  const state = yield call(NetInfo.fetch);
  if (state.isConnected) {
    const token = yield select(state => state.socketSlice.infoUser.token);
    const device_id = yield select(
      state => state.socketSlice.infoUser.device_id,
    );
    console.log('reconnectSocketSaga', {token, device_id});

    if (token && device_id) {
      yield put(setInfoUser({token, device_id}));
    }
  } else {
    console.log('No network connection, will not attempt to reconnect.');
  }
}

function* watchConversationActions() {
  yield takeEvery('FETCH_CONVERSATION_DATA', fetchConversationsSaga);
  yield takeEvery('SEND_MESSAGE', sendMessageSaga);
  yield takeEvery(loadMoreConversations.type, fetchConversationsSaga);
  yield takeEvery('FETCH_MESSAGES_DATA', fetchMessagesSaga);
  yield takeEvery('CHECK_USER_STATUS', checkUserStatusSaga);
  yield takeEvery('SEND_HEARTBEAT', sendHeartbeatSaga);
  yield takeEvery('MARK_MESSAGE_AS_READ', markMessageAsReadSaga);
  yield takeEvery('SEND_TYPING_INDICATOR', sendTypingIndicatorSaga);

  yield takeEvery('JOIN_CONVERSATION', joinConversationSaga);
  yield takeEvery('LOAD_MORE_CONVERSATIONS', loadMoreConversationsSaga);
  yield takeEvery('LOAD_MORE_MESSAGES', loadMoreMessagesSaga);
  yield takeEvery('REFRESH_CONVERSATIONS', refreshConversationsSaga); // Add this line

  // action to send match action
  yield takeEvery('SEND_MATCH_ACTION', sendMatchActionSaga);
  yield takeEvery('FETCH_SEARCH_THREADS', searchThreadsSaga);
  yield takeEvery(
    'FETCH_LOAD_MORE_SEARCH_CONVERSATIONS',
    loadMoreSearchConversationsSaga,
  );
  yield takeEvery('RECONNECT_SOCKET', reconnectSocketSaga);
}

export default function* socketSaga() {
  yield all([watchSetSocket(), watchConversationActions()]);
}
