import {FontSize, Shadow, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {},
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width8,
      height: Spacing.height40,
      ...Shadow.normal,
      borderRadius: 8,
      paddingHorizontal: Spacing.width12,
      backgroundColor: themeColors.background,
    },
    input: {
      fontSize: FontSize.FontSize14,
      color: themeColors.text,

      flex: 1,
      height: '100%',
    },
    btnClose: {
      height: '100%',
      paddingHorizontal: Spacing.width8,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
