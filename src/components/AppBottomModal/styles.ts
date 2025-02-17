import {Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',

      justifyContent: 'flex-end',
    },
    buttonLine: {
      height: Spacing.width16,
      backgroundColor: 'red',
    },
    modalContainer: {
      position: 'absolute',

      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: themeColors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    line: {
      height: 5,
      width: Spacing.width36,
      borderRadius: Spacing.width2,
      backgroundColor: themeColors.border,
      alignSelf: 'center',
      position: 'absolute',
      top: 4,
    },
  });
