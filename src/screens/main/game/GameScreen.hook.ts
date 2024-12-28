import {dashboardGame} from '@services';
import {useTheme} from '@theme';
import {useState} from 'react';
import {createStyles} from './styles';

export const useGameScreen = () => {
  const [data, setData] = useState(dashboardGame);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  return {data, themeColors, styles};
};
