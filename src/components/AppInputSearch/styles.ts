import {FontSize, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.background,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width8,
      height: Spacing.height40,
      borderWidth: 1,
      borderColor: themeColors.inputBorder,
      borderRadius: 8,
      paddingHorizontal: Spacing.width12,
      backgroundColor: themeColors.inputBackground,
    },
    input: {
      fontSize: FontSize.FontSize14,
      color: themeColors.inputText,

      flex: 1,
      height: '100%',
    },
  });
