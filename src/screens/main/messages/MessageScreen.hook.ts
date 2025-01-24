import {useRoute} from '@react-navigation/native';
import {
  loadMoreMessages,
  loadMoreMessagesFailure,
  loadMoreMessagesSuccess,
  refreshMessages,
  refreshMessagesFailure,
  refreshMessagesSuccess,
  selectIsNext,
  selectLoading,
  selectMessages,
} from '@redux';
import {getListConversationApi} from '@services';
import {useTheme} from '@theme';
import {MessageItem} from '@types';
import {t} from 'i18next';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';

interface MessageScreenProps {
  title?: string;
  type?: string;
}

export const useMessageScreen = () => {
  const route = useRoute();
  const {title} = (route.params as MessageScreenProps) || {};
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const dispatch = useDispatch();
  const data: MessageItem[] = useSelector(selectMessages) || [];
  const loading = useSelector(selectLoading);
  const isNext = useSelector(selectIsNext);

  useEffect(() => {
    fetchMessages(1);
  }, [dispatch]);

  const fetchMessages = async (page: number) => {
    try {
      const response: any = await getListConversationApi({paged: page});
      const {data: newData, is_next} = response.data;
      console.log({response});

      if (page === 1) {
        dispatch(refreshMessagesSuccess(newData));
      } else {
        dispatch(loadMoreMessagesSuccess({messages: newData, isNext: is_next}));
      }
    } catch (error) {
      if (page === 1) {
        dispatch(refreshMessagesFailure(error.toString()));
      } else {
        dispatch(loadMoreMessagesFailure(error.toString()));
      }
    }
  };

  const handleLoadMore = () => {
    if (isNext && !loading) {
      const nextPage = Math.floor(data.length / 10) + 1;
      dispatch(loadMoreMessages());
      fetchMessages(nextPage);
    }
  };

  const onRefresh = () => {
    dispatch(refreshMessages());
    fetchMessages(1);
  };

  return {
    themeColors,
    styles,
    title: title || t('message.title'),
    data,
    loading,
    handleLoadMore,
    onRefresh,
  };
};
