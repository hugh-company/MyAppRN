import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {useState} from 'react';
import {createStyles} from './styles';

export const useHistoryContentScreen = () => {
  const [data, setData] = useState([]);
  const params = useRoute().params as any;

  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  return {data, themeColors, styles, params};
};
