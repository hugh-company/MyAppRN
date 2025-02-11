import {
  loadMoreConversations,
  loadMoreMessages,
  readAllMessages,
  refreshConversations,
  refreshMessages,
  setConversation,
  setInfoUser,
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

interface SocketEventPayload {
  action: MessageAction;
  cursor_time: string;
  is_next: boolean;
  thread_id: string;
  data?: ConversationInterface[];
  message?: any;
}

function* handleSocketOpen(socket: WebSocket, token: string) {
  console.log('WebSocket connected - handleSocketOpen');
  yield fork(reSendConnect, socket, token); // Use fork to run reSendConnect in the background
  yield put({type: 'FETCH_CONVERSATION_DATA', payload: {cursor_time: ''}}); // Dispatch an action to fetch conversations
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
    };

    socket.onerror = function (error) {
      console.error('WebSocket error', error);
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
  console.log('handleDataMessage', data);

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
  if (data?.action === MessageAction.MESSAGE_SENT) {
    yield put(updateMessageSent({message: data}));
  }
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
    if (action.type === 'SOCKET_ON_MESSAGE') {
      yield call(handleDataMessage, action.data);
    } else {
      yield put(action);
    }
  });
}

function* watchSetSocket() {
  yield takeEvery(setInfoUser.type, function* (action) {
    const {token, device_id} = action.payload;
    console.log({action});

    let attempts = 0;
    const maxAttempts = 5;
    const retryDelay = 2000; // 2 seconds

    while (attempts < maxAttempts) {
      try {
        const socket: WebSocket = new WebSocket(
          `${WEBSOCKET_URL}?token=${token}&device_id=${device_id}`,
        );
        console.log({socket});
        yield put(setSocket({socket}));

        yield call(handleSocketEvents, socket, token);
        break;
      } catch (error) {
        console.error('WebSocket connection failed', error);
        attempts += 1;
        if (attempts < maxAttempts) {
          console.log(`Retrying connection (${attempts}/${maxAttempts})...`);
          yield call(delay, retryDelay);
        } else {
          console.error('Max connection attempts reached. Giving up.');
        }
      }
    }
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
    cursor_time: cursor_time,
  };
  console.log('fetchConversationsSaga', {params});
  socket.send(JSON.stringify(params));
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

    socket.send(JSON.stringify(params));
  }
}

// message
function* fetchMessagesSaga(
  action: PayloadAction<{thread_id: string}>,
): Generator<any, void, any> {
  const {thread_id} = action.payload;
  const socket = yield select(state => state.socketSlice.socket);
  const token = yield select(state => state.socketSlice.infoUser.token);
  console.log({thread_id});
  socket.send(
    JSON.stringify({
      token: token,
      action: MessageAction.GET_MESSAGES,
      thread_id: thread_id,
    }),
  );
}
// send message to socket
function* sendMessageSaga(action: any): Generator<any, void, any> {
  const message = action.payload;
  console.log({message});

  const socket = yield select(state => state.socketSlice.socket);
  socket.send(JSON.stringify(message));
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
  action: PayloadAction<{thread_id: string}>,
): Generator<any, void, any> {
  const {thread_id} = action.payload;
  const socket = yield select(state => state.socketSlice.socket);
  const token = yield select(state => state.socketSlice.infoUser.token);
  console.log('joinConversationSaga', {thread_id});

  socket.send(
    JSON.stringify({
      action: 'set_join_thread',
      token: token,
      thread_id: thread_id,
    }),
  );
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
}

export default function* socketSaga() {
  yield all([watchSetSocket(), watchConversationActions()]);
}
