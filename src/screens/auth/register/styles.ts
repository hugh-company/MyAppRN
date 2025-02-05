import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.background,
      flex: 1,
    },
    body: {
      paddingHorizontal: Spacing.width16,
    },
    viewInfo: {
      alignItems: 'center',
      gap: Spacing.height8,
      marginBottom: Spacing.width32,
    },
    descripstion: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
      color: themeColors.text,
      width: '75%',
      textAlign: 'center',
    },
    title: {
      fontSize: FontSize.FontSize20,
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.text,
      textAlign: 'center',
    },
    btnLogin: {
      width: Spacing.width145,
      alignSelf: 'center',
      marginTop: Spacing.height16,
    },
    input: {
      height: Spacing.height48,
      borderWidth: 1,
      borderColor: themeColors.inputBorder,
      borderRadius: 8,
      paddingHorizontal: Spacing.width12,
      fontSize: FontSize.FontSize14,
      color: themeColors.inputText,
      backgroundColor: themeColors.inputBackground,
      marginBottom: Spacing.height16,
    },
  });
