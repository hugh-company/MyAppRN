import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: Spacing.height16,
    },
    label: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_600,

      marginBottom: Spacing.height8,
    },
    inputContainer: {
      position: 'relative',
    },
    input: {
      height: Spacing.height44,
      borderWidth: 1,
      borderColor: themeColors.inputBorder,
      borderRadius: 8,
      paddingHorizontal: Spacing.width12,
      fontSize: FontSize.FontSize14,
      color: themeColors.inputText,
      backgroundColor: themeColors.inputBackground,
      justifyContent: 'center',
    },
    txtInput: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    txtPlaceholder: {
      color: themeColors.placeholder,
    },
    inputError: {
      borderColor: themeColors.error,
    },
    error: {
      color: themeColors.error,
      fontSize: FontSize.FontSize12,
      marginTop: Spacing.height4,
    },
    //
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: themeColors.inputBackground,
      borderRadius: Spacing.height8,
      flex: 1,
    },
    dropdownItemStyle: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.width12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Spacing.height12,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.inputBorder,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
      color: themeColors.inputText,
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });
