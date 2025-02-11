import {getToken, joinConversation, setSocket} from '@redux';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';

const useSocket = () => {
  const dispatch = useDispatch();
  const url = 'wss://localhost:3001';
  const token = useSelector(getToken);

  useEffect(() => {
    if (token) {
      configureSocket();
    }
  }, [token]);

  const configureSocket = () => {
    const socket = io(url, {query: {token}});

    socket.on('connect', () => {
      console.log('Connected to socket');
      dispatch(setSocket(socket));
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket');
    });

    // socket.on('conversationList', data => {
    //   dispatch(setConversations(data));
    // });

    // socket.on('messageList', data => {
    //   dispatch(setMessages(data));
    // });

    // socket.on('readMessage', messageId => {
    //   dispatch(readConversation({id: messageId, read: true}));
    // });

    socket.on('joinConversation', conversation => {
      dispatch(joinConversation(conversation));
    });

    return socket;
  };
};

export default useSocket;
