import {getToken} from '@redux';
import {useTheme} from '@theme';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useDashboardCreateProfile = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const token = useSelector(getToken);
  return {data, themeColors, styles, token};
};
