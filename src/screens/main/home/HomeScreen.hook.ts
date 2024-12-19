import {useTheme} from '@theme';
import {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStyles} from './styles';

export const useHomeScreen = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const {top} = useSafeAreaInsets();
  const styles = createStyles(themeColors);

  return {data, themeColors, styles, top};
};
