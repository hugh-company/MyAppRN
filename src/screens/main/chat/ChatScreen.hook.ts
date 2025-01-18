import {useRoute} from '@react-navigation/native';
import {getUserInfo} from '@redux';
import {useTheme} from '@theme';
import {MessageItem} from '@types';
import {formatDate} from '@utils';
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

  const [messages, setMessages] = useState<any>([
    {
      id: '1',
      text: "Of course, let me know if you're on your way 😊",
      isSentByMe: true,
      timestamp: '16:46',
      read: true,
    },
    {
      id: '2',
      text: 'Can I come over?',
      isSentByMe: false,
      timestamp: '16:45',
      sender: 'Devo Mizuhara',
    },
  ]);

  const handleSend = (txt: string) => {
    if (txt.trim()) {
      setMessages([
        {
          id: Date.now().toString(),
          text: txt,
          isSentByMe: true,
          timestamp: formatDate(new Date(), 'HH:mm'),
        },
        ...messages,
      ]);
    }
  };
  return {messages, themeColors, styles, handleSend, message, userInfo};
};
