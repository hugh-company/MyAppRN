import {ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    fullScreen: {},
    containerVideo: {
      width: '100%',
      height: '100%',
      backgroundColor: themeColors.background,
    },
    video: {
      width: '100%',
      height: '100%',
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
