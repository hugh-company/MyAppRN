import {useRoute} from '@react-navigation/native';
import {getUserInfo} from '@redux';
import {useTheme} from '@theme';
import {ChatInterface, MessageItem, MessageType} from '@types';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {createStyles} from './styles';
interface ChatScreenProps {
  message: MessageItem;
}
export const useChatScreen = () => {
  const route = useRoute();
  const {message} = route.params as ChatScreenProps;
  const {themeColors} = useTheme();
  const userInfo = useSelector(getUserInfo);
  const styles = createStyles(themeColors);
  const [repliedMessage, setRepliedMessage] = useState(null);

  const [messages, setMessages] = useState<ChatInterface[]>([]);

  const handleSend = (newMessage: {
    images?: string[];
    message?: string;
    games?: any[];
  }) => {
    const params: ChatInterface = {
      id: Date.now(),
      userid: userInfo?.id || '',
      content: {
        type:
          newMessage?.images?.length > 0 ? MessageType.IMAGE : MessageType.TEXT,
        text: newMessage.message,
        images: newMessage.images,
        game: newMessage.games,
        icon: '',
        status: 'sent',
        time_created: new Date(),
        time_updated: new Date(),
      },
      reply: repliedMessage,
    };
    console.log({newMessage}, {params});
    setMessages([params, ...messages]);
  };
  const handleSwipeToReply = item => {
    console.log({item});
    setRepliedMessage(item);
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
  };
};
