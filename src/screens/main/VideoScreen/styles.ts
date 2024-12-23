import {ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    video: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    adContainer: {},
  });
