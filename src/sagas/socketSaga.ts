import NetInfo from '@react-native-community/netinfo';
import {
  addNewConversation,
  clearSocketInfoUser,
  loadMoreConversations,
  loadMoreMessages,
  loadMoreSearchConversationsSuccess,
  readAllMessagesConversions,
  readAllMessagesWithRoom,
  refreshConversations,
  refreshMessages,
  removeMessageByTempId,
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
import {showNotificationError} from '@utils';
import {t} from 'i18next';
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

const WEBSOCKET_URL = 'wss://phim3s.net/ws/';

// Queue chứa các message chưa gửi được khi socket chưa sẵn sàng
let messageQueue: any[] = [];

// Hàm gửi message an toàn: nếu socket mở thì gửi ngay, nếu không đưa vào hàng đợi
function safeSend(socket: WebSocket, message: any) {
  console.log('Sending message:', message);

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    messageQueue.push(message);
  }
}

// Tạo eventChannel cho websocket
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
      // if (event.code === 1006) {
      //   // 1006 is a special code that means the connection was closed abnormally (e.g. the server process was killed)
      //   return;
      // }
      emit({type: 'SOCKET_CLOSED', event});
    };

    socket.onerror = error => {
      console.log('WebSocket error', error);
      emit({type: 'SOCKET_CLOSED'});
      // Bạn có thể phát hành một sự kiện lỗi nếu cần
    };

    socket.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received message:', data);
        emit({type: 'SOCKET_ON_MESSAGE', data});
      } catch (err) {
        console.log('Error parsing message', err);
      }
    };

    // Hàm hủy: khi channel đóng, đóng socket
    return () => {
      socket.close();
    };
  });
}

// Xử lý sự kiện khi socket mở
function* handleSocketOpen(
  socket: WebSocket,
  token: string,
): Generator<any, void, any> {
  // Khởi chạy tác vụ heartbeat
  const heartbeatTask = yield fork(heartbeatSaga, socket, token);

  // Gửi các action khởi tạo dữ liệu
  yield put({type: 'FETCH_CONVERSATION_DATA', payload: {cursor_time: ''}});
  yield put({type: 'GET_ONLINE_USERS'});

  // Gửi lại các message chưa gửi từ redux store
  const unsentMessages = yield select(state => state.chatSlice.unsentMessages);
  for (const msg of unsentMessages || []) {
    safeSend(socket, msg);
    yield delay(500);
  }
  // join room
  const joinedConversation = yield select(
    state => state.chatSlice.joinedConversation,
  );
  if (joinedConversation !== 0) {
    yield put(
      yield put({
        type: 'JOIN_CONVERSATION',
        payload: {thread_id: joinedConversation},
      }),
    );
  }

  // Gửi các message từ queue
  while (messageQueue.length > 0) {
    const queuedMsg = messageQueue.shift();
    safeSend(socket, queuedMsg);
    yield delay(500);
  }

  // Chờ cho đến khi socket bị đóng để hủy heartbeat
  yield take('SOCKET_CLOSED');
  yield cancel(heartbeatTask);
}
function* ensureSocketConnection(
  token?: string,
  device_id?: string,
): Generator<any, void, any> {
  const socket = yield select(state => state.socketSlice.socket);

  // Nếu socket chưa kết nối hoặc đang đóng, tiến hành kết nối lại
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.log('Socket is not open. Reconnecting...');

    // Ki���m tra kết nối mạng
    const netState = yield call(NetInfo.fetch);
    if (netState.isConnected) {
      if (!token || !device_id) {
        token = yield select(state => state.socketSlice.infoUser.token);
        device_id = yield select(state => state.socketSlice.infoUser.device_id);
      }

      if (token && device_id) {
        yield put(setInfoUser({token, device_id}));
        yield fork(manageWebSocketConnection, token, device_id); // Ensure reconnection
      }
    } else {
      console.log('No network connection. Reconnect postponed.');
    }
  }
}
// Saga gửi heartbeat mỗi 55 giây
function* heartbeatSaga(
  socket: WebSocket,
  token: string,
): Generator<any, void, any> {
  while (true) {
    yield delay(55000); // heartbeat mỗi 55 giây
    const params = {token, action: 'set_status'};
    safeSend(socket, params);
    console.log('Heartbeat sent', socket, token);
  }
}

// Xử lý các message từ socket
function* handleDataMessage(data: any): Generator<any, void, any> {
  if (data?.error === 'disconnect') {
    yield put({type: 'RECONNECT_SOCKET'});
  }
  if (data?.error) {
    // showMessage({
    //   message: data?.error,

    //   type: 'danger',
    // });
    return;
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
    case MessageAction.GET_THREAD_DETAIL:
      console.log({GET_THREAD_DETAIL: data});

      break;

    case MessageAction.SET_JOIN_THREAD:
      const idUser = yield select(state => state.accountSlice?.userInfo?.id);
      if (data?.recipient_info !== idUser) {
        yield put(readAllMessagesWithRoom({thread_id: data.thread_id}));
      } else {
        yield put(readAllMessagesConversions({thread_id: data.thread_id}));
      }

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
    case MessageAction.NOTIFICATION:
      console.log('NOTIFICATION', data);

      if (data?.reason === MessageAction.BLOCK_SPAM_MESSAGE) {
        showNotificationError(t('sendMessageError'), data?.message);
        yield put(removeMessageByTempId({temp_id: data.temp_id}));
        // toast.error("Your message was blocked due to spam."); // Show notification
      }
      break;
    default:
      console.warn('Unhandled socket message action:', data.action);
      break;
  }
}

// Lắng nghe các sự kiện của socket từ eventChannel
function* watchSocketEvents(
  socket: WebSocket,
  token: string,
): Generator<any, void, any> {
  const socketChannel = yield call(createSocketChannel, socket, token);
  try {
    while (true) {
      const event = yield take(socketChannel);
      if (event.type === 'SOCKET_OPEN') {
        yield fork(handleSocketOpen, event.socket, event.token);
      } else if (event.type === 'SOCKET_CLOSED') {
        yield put({type: 'RECONNECT_SOCKET'});
        break; // Thoát vòng lặp khi đóng kết nối
      } else if (event.type === 'SOCKET_ON_MESSAGE') {
        yield call(handleDataMessage, event.data);
      } else {
        yield put(event);
      }
    }
  } finally {
    socketChannel.close();
  }
}

// Quản lý kết nối WebSocket với cơ chế tái kết nối theo lùi mũ
function* manageWebSocketConnection(
  token: string,
  device_id: string,
): Generator<any, void, any> {
  let reconnectDelay = 1000; // Bắt đầu với 1 giây
  while (true) {
    if (!token) {
      console.log('No token available. Stopping reconnection attempts.');
      break;
    }
    try {
      console.log('Attempting to connect WebSocket...');
      const socket: WebSocket = new WebSocket(
        `${WEBSOCKET_URL}?token=${token}&device_id=${device_id}`,
      );
      console.log('Socket created:', socket);

      yield put(setSocket({socket}));
      // Race giữa việc lắng nghe sự kiện và trường hợp timeout (nếu cần)
      yield race([
        call(watchSocketEvents, socket, token),
        // Bạn có thể thêm timeout nếu cần
      ]);
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }

    yield delay(reconnectDelay);
    // Tăng dần thời gian delay cho đến tối đa 30 giây
    reconnectDelay = Math.min(reconnectDelay * 2, 30000);
  }
}

// Lắng nghe action setInfoUser để bắt đầu kết nối socket
function* watchSetSocket(): Generator<any, void, any> {
  yield takeLatest(
    setInfoUser.type,
    function* (action: PayloadAction<{token: string; device_id: string}>) {
      const {token, device_id} = action.payload;
      // Cancel any existing socket connection
      console.log('Setting up new socket connection...', token, device_id);

      const existingSocket = yield select(state => state.socketSlice.socket);
      if (existingSocket) {
        existingSocket.close();
        yield put(setSocket({socket: null}));
      }
      // Khởi chạy saga quản lý kết nối. Nếu có kết nối cũ đang chạy, nó sẽ bị hủy bỏ bởi takeLatest
      yield fork(manageWebSocketConnection, token, device_id);
    },
  );
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
  yield takeLatest('FETCH_DETAIL_THREAD', fetchDetailThreadSaga);
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

function* fetchDetailThreadSaga(
  action: PayloadAction<{thread_id: string}>,
): Generator<any, void, any> {
  const token = yield select(state => state.socketSlice.infoUser.token);
  const socket = yield select(state => state.socketSlice.socket);
  safeSend(socket, {
    action: 'get_thread',
    token,
    thread_id: action.payload.thread_id,
  });
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

// Saga tái kết nối: kiểm tra trạng thái mạng trước khi kích hoạt kết nối mới
function* reconnectSocketSaga(): Generator<any, void, any> {
  const netState = yield call(NetInfo.fetch);
  if (netState.isConnected) {
    const token = yield select(state => state.socketSlice.infoUser.token);
    const device_id = yield select(
      state => state.socketSlice.infoUser.device_id,
    );
    if (token && device_id) {
      // Kích hoạt lại kết nối
      yield put(setInfoUser({token, device_id}));
    }
  } else {
    console.log('No network connection. Reconnect postponed.');
  }
}

// New saga to handle logout and close socket
function* handleLogout(): Generator<any, void, any> {
  const socket = yield select(state => state.socketSlice.socket);
  if (socket) {
    socket.close();
    yield put(clearSocketInfoUser());
  }
  // Cancel the heartbeat saga if it's running
  yield put({type: 'SOCKET_CLOSED'});
}

// Root saga của socket
export default function* socketSaga(): Generator<any, void, any> {
  yield all([fork(watchSetSocket), fork(watchConversationActions)]);
}
//
