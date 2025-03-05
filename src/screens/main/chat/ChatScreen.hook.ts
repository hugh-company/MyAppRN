import {useRoute} from '@react-navigation/native';
import {
  fetchMessagesSaga,
  getJoinedConversation,
  getMessage,
  getToken,
  getUserInfo,
  joinConversationSaga,
  loadMoreMessagesSaga,
  markMessageAsReadSaga,
  sendMessageSaga,
  setLoadMoreMessage,
  updateNewMessage,
} from '@redux';
import {uploadImages} from '@services';
import {useTheme} from '@theme';
import {
  ConversationInterface,
  MessageItemInterface,
  MessageStatus,
} from '@types';
import dayjs from 'dayjs';
import {useEffect, useRef, useState} from 'react';
import {FlatList, InteractionManager} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';
interface ChatScreenProps {
  message: ConversationInterface;
}
export const useChatScreen = () => {
  const route = useRoute();
  const token = useSelector(getToken);
  const {message} = route.params as ChatScreenProps;
  const {themeColors} = useTheme();
  const userInfo = useSelector(getUserInfo);
  const styles = createStyles(themeColors);
  const [repliedMessage, setRepliedMessage] =
    useState<MessageItemInterface | null>(null);
  const dispatch = useDispatch();
  const {is_next, cursor_id, messages, loading, isLoadMore} =
    useSelector(getMessage);
  const flatListRef = useRef<FlatList>(null);
  const joinThread = useSelector(getJoinedConversation);
  useEffect(() => {
    dispatch(
      fetchMessagesSaga({
        thread_id: message?.thread_id,
        recipient_id: message.other_user?.id,
      }),
    );

    return () => {
      dispatch(joinConversationSaga({thread_id: '0'}));
    };
  }, []);
  useEffect(() => {
    const interactionHandle = InteractionManager.runAfterInteractions(() => {
      dispatch(
        joinConversationSaga({
          thread_id: message?.thread_id,
          recipient_id: message?.other_user?.id,
        }),
      );
      if (!message?.isread && message?.thread_id) {
        dispatch(markMessageAsReadSaga({message_id: message?.last_message.id}));
      }
    });

    return () => interactionHandle.cancel();
  }, []);
  const handleSend = async (newMessage: {
    images?: string[];
    message?: string;
    games?: any[];
    sticker?: string;
  }) => {
    const typeMessage = newMessage.images?.length
      ? 'image'
      : newMessage.games?.length
      ? 'game'
      : newMessage.sticker?.length
      ? 'sticker'
      : 'text';

    const params: any = {
      action: 'send_message',
      id: `temp_${new Date().getTime()}`,
      token: token,

      recipient_id: message.other_user?.id,
      sender_id: userInfo?.id,
      temp_id: `temp_${new Date().getTime()}`,
      content: {
        type: typeMessage,
        status: MessageStatus.SENDING,
        data: {
          text: newMessage.message,
          images: newMessage.images,
          games: newMessage.games,
          sticker: newMessage.sticker,
          // icon: '',
        },
        created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      },
    };
    if (message.thread_id) {
      params.thread_id = message.thread_id;
    }
    if (repliedMessage) {
      params.content.replyto = repliedMessage;
    }
    console.log({params});
    dispatch(updateNewMessage({message: params}));
    if (newMessage.images?.length) {
      const nameImage = await uploadImagesApi(newMessage.images);
      console.log({newMessage, nameImage});
      dispatch(
        sendMessageSaga({
          ...params,
          content: {
            ...params.content,
            data: {
              ...params.content.data,
              images: nameImage,
            },
          },
        }),
      );

      return;
    }
    dispatch(sendMessageSaga(params));
  };
  const handleSwipeToReply = (item: MessageItemInterface) => {
    console.log({item});
    setRepliedMessage(item);
  };
  const handleLoadMoreMessages = () => {
    if (is_next && !isLoadMore) {
      dispatch(setLoadMoreMessage());
      dispatch(loadMoreMessagesSaga({thread_id: message.thread_id, cursor_id}));
    }
  };
  const onRefreshMessages = () => {
    dispatch(fetchMessagesSaga({thread_id: message.thread_id}));
  };
  const handleMarkMessageAsRead = (message_id: number) => {
    dispatch(markMessageAsReadSaga({message_id}));
  };
  const scrollToRepliedMessage = async (
    repliedMessage: MessageItemInterface,
  ) => {
    let index = messages.findIndex(msg => msg.id === repliedMessage.id);
    console.log({index}, {repliedMessage});

    while (index === -1 && is_next) {
      await new Promise(resolve => {
        dispatch(
          loadMoreMessagesSaga({
            thread_id: repliedMessage.thread_id,
            cursor_id,
            callback: resolve,
          }),
        );
      });
      index = messages.findIndex(msg => msg.id === repliedMessage.id);
    }
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({index});
    }
  };
  //
  const uploadImagesApi = async (images: any): Promise<any> => {
    try {
      const responseImage = await uploadImages({
        images,
        path: `chats/${message.thread_id || joinThread}`,
        token,
      });
      return responseImage?.data?.uploaded_files?.map(
        (image: any) => image?.name,
      );
    } catch (error) {
      console.log({error});
    }
  };
  return {
    messages,
    themeColors,
    styles,
    handleSend,
    repliedMessage,
    setRepliedMessage,
    message,
    userInfo,
    handleSwipeToReply,
    handleLoadMoreMessages,
    onRefreshMessages,
    handleMarkMessageAsRead,

    scrollToRepliedMessage,
    flatListRef,
    loading,
    is_next,
    isLoadMore,
  };
};
