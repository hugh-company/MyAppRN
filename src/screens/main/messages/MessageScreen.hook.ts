import {useRoute} from '@react-navigation/native';
import {
  fetchConversationsSaga,
  getConversation,
  loadMoreConversationsSaga,
  refreshConversationsSaga,
  setConversationLoadMore,
  setConversationRefreshing,
} from '@redux';
import {useTheme} from '@theme';
import {t} from 'i18next';
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
  const {is_next, conversations, cursor_time, isLoadMore, isRefreshing} =
    useSelector(getConversation);

  const fetchConversations = async (page: number) => {
    dispatch(fetchConversationsSaga());
  };

  const handleLoadMore = () => {
    if (is_next && !isLoadMore) {
      dispatch(setConversationLoadMore());
      dispatch(loadMoreConversationsSaga({cursor_time}));
    }
  };

  const onRefresh = () => {
    if (!isRefreshing) {
      dispatch(setConversationRefreshing());
      dispatch(refreshConversationsSaga());
    }
  };

  return {
    themeColors,
    styles,
    title: title || t('message.title'),
    conversations,
    handleLoadMore,
    onRefresh,
  };
};
