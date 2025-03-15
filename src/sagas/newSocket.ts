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
  setListUserOnline,
  setLoadingMessage,
  setMessage,
  setSocket,
  updateMessageSent,
  updateNewMessage,
  userOffline,
  userOnline,
} from '@redux';
import {PayloadAction} from '@reduxjs/toolkit';
import {MessageAction} from '@types';
import {eventChannel, EventChannel} from 'redux-saga';
import {
  all,
  call,
  cancel,
  delay,
  fork,
  put,
  race,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';

const WEBSOCKET_URL = 'wss://oninapp.com/ws/';

// Queue chứa các message chưa gửi nếu socket chưa mở
let messageQueue: any[] = [];

// Hàm gửi message an toàn: nếu socket mở thì gửi ngay, nếu chưa mở sẽ lưu vào queue
function safeSend(socket: WebSocket, message: any) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    messageQueue.push(message);
  }
}

// Tạo eventChannel để lắng nghe các sự kiện của WebSocket
function createSocketChannel(
  socket: WebSocket,
  token: string,
): EventChannel<any> {
  return eventChannel(emit => {
    socket.onopen = () => {
      console.log('WebSocket connected');
      emit({type: 'SOCKET_OPEN', socket, token});
    };

    socket.onclose = event => {
      console.log('WebSocket closed', event);
      emit({type: 'SOCKET_CLOSED', event});
    };

    socket.onerror = error => {
      console.error('WebSocket error', error);
      emit({type: 'SOCKET_ERROR', error});
    };

    socket.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received message:', data);
        emit({type: 'SOCKET_MESSAGE', data});
      } catch (err) {
        console.error('Error parsing message', err);
      }
    };

    // Hàm hủy channel: đóng socket khi channel bị hủy
    return () => socket.close();
  });
}

// Saga xử lý sự kiện khi socket mở
function* handleSocketOpen(
  socket: WebSocket,
  token: string,
): Generator<any, void, any> {
  // Bắt đầu tác vụ heartbeat
  const heartbeatTask = yield fork(heartbeatSaga, socket, token);

  // Gửi lại các message chưa gửi trong redux store (nếu có)
  const unsentMessages = yield select(state => state.chatSlice.unsentMessages);
  for (const msg of unsentMessages || []) {
    safeSend(socket, msg);
    yield delay(500);
  }
  // Gửi các message đã lưu trong queue
  while (messageQueue.length > 0) {
    const queuedMsg = messageQueue.shift();
    safeSend(socket, queuedMsg);
    yield delay(500);
  }

  // Chờ cho đến khi socket bị đóng để hủy heartbeat
  yield take('SOCKET_CLOSED');
  yield cancel(heartbeatTask);
}

// Saga heartbeat: gửi heartbeat mỗi 55 giây để duy trì kết nối
function* heartbeatSaga(
  socket: WebSocket,
  token: string,
): Generator<any, void, any> {
  while (true) {
    yield delay(55000);
    safeSend(socket, {token, action: 'set_status'});
    console.log('Heartbeat sent');
  }
}

// Saga lắng nghe các sự kiện của socket qua channel
function* watchSocketEvents(
  socket: WebSocket,
  token: string,
): Generator<any, void, any> {
  const channel = yield call(createSocketChannel, socket, token);
  try {
    while (true) {
      const event = yield take(channel);
      switch (event.type) {
        case 'SOCKET_OPEN':
          yield fork(handleSocketOpen, event.socket, event.token);
          break;
        case 'SOCKET_CLOSED':
          yield put({type: 'RECONNECT_SOCKET'});
          break;
        case 'SOCKET_MESSAGE':
          yield call(handleSocketMessage, event.data);
          break;
        case 'SOCKET_ERROR':
          yield put({type: 'SOCKET_CLOSED'});
          break;
        default:
          console.warn('Unhandled event type:', event.type);
          break;
      }
    }
  } finally {
    channel.close();
  }
}

// Hàm xử lý các message nhận được từ server (có thể bổ sung thêm các case tùy theo action)
function* handleSocketMessage(data: any): Generator<any, void, any> {
  console.log('socket message', data);

  if (data?.error === 'disconnect') {
    yield put({type: 'RECONNECT_SOCKET'});
  }
  switch (data?.action) {
    case MessageAction.GET_THREAD: {
      const {isLoadMore, isRefreshing} = yield select(
        state => state.chatSlice.conversation,
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
      break;
    }
    case MessageAction.GET_MESSAGES: {
      const {isLoadMore, isRefreshing} = yield select(
        state => state.chatSlice.message,
      );
      if (isLoadMore) {
        yield put(
          loadMoreMessages({
            messages: data.data,
            cursor_id: data.cursor,
            is_next: data.is_next,
          }),
        );
      } else if (isRefreshing) {
        yield put(
          refreshMessages({
            messages: data.data,
            cursor_id: data.cursor,
            is_next: data.is_next,
          }),
        );
      } else {
        yield put(
          setMessage({
            messages: data.data,
            cursor_id: data.cursor,
            is_next: data.is_next,
          }),
        );
      }
      break;
    }
    case MessageAction.SET_JOIN_THREAD:
      yield put(readAllMessages({thread_id: data.thread_id}));
      break;
    case MessageAction.NEW_MESSAGE:
      yield put(updateNewMessage(data));
      break;
    case MessageAction.NEW_THREAD:
      yield put(addNewConversation(data.thread));
      break;
    case MessageAction.MESSAGE_SENT:
      yield put(updateMessageSent({message: data}));
      break;
    case MessageAction.SEARCH_MESSAGE: {
      const {isLoadMore} = yield select(state => state.searchMessageSlice);
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
      break;
    }
    case MessageAction.USER_ONLINE:
      console.log({data});

      yield put(setListUserOnline(data?.users));
      break;
    case MessageAction.NOITE_ONLINE:
      yield put(userOnline(data?.user));
      break;
    case MessageAction.NOTICE_OFFLINE:
      yield put(userOffline(data.user_id));
      break;
    default:
      console.warn('Unhandled socket message action:', data.action);
      break;
  }
}

// Hàm quản lý kết nối WebSocket với cơ chế tái kết nối theo lùi mũ
function* manageWebSocketConnection(
  token: string,
  device_id: string,
): Generator<any, void, any> {
  let reconnectDelay = 1000; // bắt đầu với 1 giây
  while (true) {
    if (!token) {
      console.log('Token không hợp lệ. Dừng kết nối.');
      break;
    }
    try {
      console.log('Khởi tạo kết nối WebSocket...');
      const socket: WebSocket = new WebSocket(
        `${WEBSOCKET_URL}?token=${token}&device_id=${device_id}`,
      );
      yield put(setSocket({socket}));
      // Sử dụng race để chạy lắng nghe socket
      yield race([call(watchSocketEvents, socket, token)]);
    } catch (error) {
      console.error('Lỗi kết nối WebSocket:', error);
    }
    console.log(`Tái kết nối sau ${reconnectDelay / 1000} giây...`);
    yield delay(reconnectDelay);
    reconnectDelay = Math.min(reconnectDelay * 2, 30000); // tối đa 30 giây
  }
}

/* ==== Các saga quản lý hành động thông qua action ==== */

// 1. INIT_SOCKET: khởi tạo kết nối với token và device_id được truyền vào
function* initSocketSaga(
  action: PayloadAction<{token: string; device_id: string}>,
): Generator<any, void, any> {
  const {token, device_id} = action.payload;
  // Lưu lại thông tin người dùng
  yield put(setInfoUser({token, device_id}));
  // Nếu có kết nối hiện có, đóng nó trước khi khởi tạo mới
  const existingSocket = yield select(state => state.socketSlice.socket);
  if (existingSocket) {
    existingSocket.close();
    yield put(setSocket({socket: null}));
  }
  yield fork(manageWebSocketConnection, token, device_id);
}

// 2. RECONNECT_SOCKET: kiểm tra kết nối mạng và tái khởi tạo kết nối nếu có
function* reconnectSocketSaga(): Generator<any, void, any> {
  const netState = yield call(NetInfo.fetch);
  if (netState.isConnected) {
    const token: string = yield select(
      state => state.socketSlice.infoUser.token,
    );
    const device_id: string = yield select(
      state => state.socketSlice.infoUser.device_id,
    );
    if (token && device_id) {
      yield put({type: 'INIT_SOCKET', payload: {token, device_id}});
    }
  } else {
    console.log('Không có kết nối mạng. Tái kết nối bị hoãn lại.');
  }
}

// 3. CLEAR_SOCKET: đóng kết nối socket khi logout và reset lại trạng thái
function* clearSocketConnectionSaga(): Generator<any, void, any> {
  const socket: WebSocket = yield select(state => state.socketSlice.socket);
  if (socket) {
    socket.close();
  }
  yield put(setSocket({socket: null}));
  console.log('Socket đã được đóng cho mục đích logout.');
}
// Các saga xử lý các hành động liên quan đến conversation
function* watchConversationActions(): Generator<any, void, any> {
  yield takeLatest('FETCH_CONVERSATION_DATA', fetchConversationsSaga);
  yield takeLatest('SEND_MESSAGE', sendMessageSaga);
  yield takeLatest(loadMoreConversations.type, fetchConversationsSaga);
  yield takeLatest('FETCH_MESSAGES_DATA', fetchMessagesSaga);
  yield takeLatest('CHECK_USER_STATUS', checkUserStatusSaga);
  yield takeLatest('SEND_HEARTBEAT', sendHeartbeatSagaDirect);
  yield takeLatest('MARK_MESSAGE_AS_READ', markMessageAsReadSaga);
  yield takeLatest('SEND_TYPING_INDICATOR', sendTypingIndicatorSaga);
  yield takeLatest('JOIN_CONVERSATION', joinConversationSaga);
  yield takeLatest('LOAD_MORE_CONVERSATIONS', loadMoreConversationsSaga);
  yield takeLatest('LOAD_MORE_MESSAGES', loadMoreMessagesSaga);
  yield takeLatest('REFRESH_CONVERSATIONS', refreshConversationsSaga);
  yield takeLatest('SEND_MATCH_ACTION', sendMatchActionSaga);
  yield takeLatest('FETCH_SEARCH_THREADS', searchThreadsSaga);
  yield takeLatest(
    'FETCH_LOAD_MORE_SEARCH_CONVERSATIONS',
    loadMoreSearchConversationsSaga,
  );
  yield takeLatest('RECONNECT_SOCKET', reconnectSocketSaga);
  yield takeLatest('GET_ONLINE_USERS', fetchUserOnline);
  yield takeLatest('USER_LOGOUT', handleLogout);
}

// Watcher các action liên quan đến socket
function* watchSocketActions(): Generator<any, void, any> {
  yield takeLatest('INIT_SOCKET', initSocketSaga);
  yield takeLatest('RECONNECT_SOCKET', reconnectSocketSaga);
  yield takeLatest('CLEAR_SOCKET', clearSocketConnectionSaga);
}

// Các hàm saga gửi message thông qua safeSend
function* fetchConversationsSaga(
  action: PayloadAction<{cursor_time: string}>,
): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  const params = {
    token,
    action: 'get_threads',
    cursor_time: action.payload?.cursor_time || '',
  };
  console.log({socket});

  safeSend(socket, params);
}

function* fetchMessagesSaga(
  action: PayloadAction<{thread_id?: string; recipient_id?: string}>,
): Generator<any, void, any> {
  yield put(setLoadingMessage());
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  const params: any = {token, action: MessageAction.GET_MESSAGES};
  if (action.payload.thread_id) {
    params.thread_id = action.payload.thread_id;
  }
  if (action.payload.recipient_id) {
    params.recipient_id = action.payload.recipient_id;
  }
  safeSend(socket, params);
}

function* sendMessageSaga(action: any): Generator<any, void, any> {
  const message = action.payload;
  const socket = yield select(state => state.socketSlice.socket);
  try {
    safeSend(socket, message);
  } catch (error) {
    console.error('Message sending failed', error);
  }
}

function* checkUserStatusSaga(
  action: PayloadAction<{user_id: number}>,
): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  safeSend(socket, {
    action: 'get_user_status',
    token,
    user_id: action.payload.user_id,
  });
}

function* sendHeartbeatSagaDirect(): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  safeSend(socket, {action: 'set_status', token});
}

function* markMessageAsReadSaga(
  action: PayloadAction<{message_id: number}>,
): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  safeSend(socket, {
    action: 'send_notice_read',
    token,
    message_id: action.payload.message_id,
  });
}

function* sendTypingIndicatorSaga(
  action: PayloadAction<{recipient_id: number; typing: boolean}>,
): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  safeSend(socket, {
    action: 'set_notice_typing',
    token,
    recipient_id: action.payload.recipient_id,
    typing: action.payload.typing,
  });
}

function* sendMatchActionSaga(
  action: PayloadAction<{recipient_id: number; relation_type: string}>,
): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  safeSend(socket, {
    action: 'send_match_action',
    token,
    recipient_id: action.payload.recipient_id,
    relation_type: action.payload.relation_type,
  });
}

function* joinConversationSaga(
  action: PayloadAction<{thread_id?: string; recipient_id?: number}>,
): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  const params: any = {action: 'set_join_thread', token};
  if (action.payload.thread_id) {
    params.thread_id = action.payload.thread_id;
  }
  if (action.payload.recipient_id) {
    params.recipient_id = action.payload.recipient_id;
  }
  safeSend(socket, params);
}

function* loadMoreConversationsSaga(
  action: PayloadAction<{cursor_time: string}>,
): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  safeSend(socket, {
    token,
    action: 'get_threads',
    cursor_time: action.payload.cursor_time,
  });
}

function* loadMoreMessagesSaga(
  action: PayloadAction<{thread_id: string; cursor_id: number}>,
): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  safeSend(socket, {
    token,
    action: MessageAction.GET_MESSAGES,
    thread_id: action.payload.thread_id,
    cursor: action.payload.cursor_id,
  });
}

function* refreshConversationsSaga(): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  safeSend(socket, {token, action: 'get_threads', cursor_time: ''});
}

function* searchThreadsSaga(
  action: PayloadAction<{key: string; cursor: string}>,
): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  safeSend(socket, {
    token,
    action: 'search_threads',
    key: action.payload.key,
    cursor: action.payload.cursor,
  });
}

function* loadMoreSearchConversationsSaga(
  action: PayloadAction<{cursor_time: string}>,
): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  safeSend(socket, {
    token,
    action: 'search_threads',
    cursor_time: action.payload.cursor_time,
  });
}
// get user online
function* fetchUserOnline(): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  safeSend(socket, {
    token,
    action: 'get_online_list',
  });
}

// New saga to handle logout and close socket
function* handleLogout(): Generator<any, void, any> {
  const socket = yield select(state => state.socketSlice.socket);
  if (socket) {
    socket.close();
    yield put(setSocket({socket: null}));
  }
  // Cancel the heartbeat saga if it's running
  yield put({type: 'SOCKET_CLOSED'});
}

// Root saga export
export default function* socketSaga(): Generator<any, void, any> {
  yield all([fork(watchSocketActions)]);
}
