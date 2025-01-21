import {useRoute} from '@react-navigation/native';
import {messagesApi} from '@services';
import {useTheme} from '@theme';
import {MessageItem} from '@types';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {createStyles} from './styles';
interface MessageScreenProps {
  title?: string;
  type?: string;
}
export const useMessageScreen = () => {
  const route = useRoute();
  const {title} = (route.params as MessageScreenProps) || {};
  const [data, setData] = useState<MessageItem[]>([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  useEffect(() => {
    setData(messagesApi);
  }, []);
  const onRefreshList = () => {
    // fetch data
  };
  return {
    data,
    themeColors,
    styles,
    title: title || t('message.title'),
    onRefreshList,
  };
};
