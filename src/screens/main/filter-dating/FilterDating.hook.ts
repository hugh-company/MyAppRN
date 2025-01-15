import {dataUserFinding} from '@services';
import {useTheme} from '@theme';
import {UserFindInterface} from '@types';
import {useEffect, useState} from 'react';
import {createStyles} from './styles';

export const useFilterDating = () => {
  const [data, setData] = useState<UserFindInterface[]>([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [isFilter, setIsFilter] = useState(false);
  useEffect(() => {
    setData(dataUserFinding || []);
  }, []);
  const onFilterApi = () => {};

  return {data, themeColors, styles, isFilter, setIsFilter};
};
