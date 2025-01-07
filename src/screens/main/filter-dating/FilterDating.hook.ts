import {useTheme} from '@theme';
import {useState} from 'react';
import {createStyles} from './styles';

export const useFilterDating = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [isFilter, setIsFilter] = useState(false);

  return {data, themeColors, styles, isFilter, setIsFilter};
};
