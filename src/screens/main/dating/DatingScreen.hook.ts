import {dashboardList} from '@services';
import {useTheme} from '@theme';
import {useEffect, useState} from 'react';
import {createStyles} from './styles';

export const useDatingScreen = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const [loading, setLoading] = useState(true);
  const styles = createStyles(themeColors);
  useEffect(() => {
    setData(dashboardList);
    setLoading(false);
  }, []);
  return {data, themeColors, styles, loading};
};
