import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {useState} from 'react';
import {createStyles} from './styles';

export const useDetailScreen = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const {params} = useRoute();
  console.log('====================================');
  console.log('DetailScreen params:', params);
  console.log('====================================');
  const styles = createStyles(themeColors);

  return {data, themeColors, styles, params};
};
