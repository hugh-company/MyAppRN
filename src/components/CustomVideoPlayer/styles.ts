import {ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    fullScreen: {},
    video: {
      // flex: 1,
      // backgroundColor: 'green',
    },
    errorContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorText: {
      color: themeColors.error,
      textAlign: 'center',
    },
    controls: {
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      flex: 1,

      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });
