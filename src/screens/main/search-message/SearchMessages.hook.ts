import {
  loadMoreSearchConversationsSagaAction,
  RootState,
  searchThreadsSagaAction,
  searchThreadsSuccess,
} from '@redux';
import {useTheme} from '@theme';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useSearchMessages = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  const {conversations, is_next, cursor_time, isLoadMore, isRefreshing} =
    useSelector((state: RootState) => state.searchMessageSlice);
  const dispatch = useDispatch();

  const searchMessage = async (text: string) => {
    console.log({text});

    dispatch(searchThreadsSagaAction({key: text, cursor: ''}));
  };

  const handleLoadMore = () => {
    if (is_next && !isLoadMore) {
      dispatch(
        loadMoreSearchConversationsSagaAction({
          cursor_time: cursor_time,
        }),
      );
    }
  };

  const onClear = () => {
    dispatch(
      searchThreadsSuccess({
        conversations: [],
        cursor_time: '',
        is_next: false,
      }),
    );
  };
  return {
    data,
    themeColors,
    styles,
    searchMessage,
    conversations,
    isRefreshing,
    isLoadMore,
    handleLoadMore,
    onClear,
  };
};
