import {getConversation, getLoading} from '@redux';
import {useTheme} from '@theme';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useConversationScreen = () => {
  const [loading, setLoading] = useState(false); // Add loading state
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const dispatch = useDispatch();
  const conversation = useSelector(getConversation);
  const isLoading = useSelector(getLoading);
  const conversations = conversation.conversations;

  return {conversations, loading, setLoading, themeColors, styles, loadMore};
};
