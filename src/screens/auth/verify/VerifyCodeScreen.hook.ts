import { useTheme } from '@theme';
import { useState } from 'react';
import { createStyles } from './styles';

export const useVerifyCodeScreen = () => {
  const [data, setData] = useState([]);
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  return { data, themeColors, styles };
};
