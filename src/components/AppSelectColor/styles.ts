import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: Spacing.height16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    label: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_600,
    },
    inputContainer: {
      position: 'relative',
    },
    input: {
      height: Spacing.height44,

      borderRadius: 8,
      paddingHorizontal: Spacing.width12,
      fontSize: FontSize.FontSize14,
      color: themeColors.inputText,
      backgroundColor: themeColors.inputBackground,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    valueColor: {
      borderRadius: Spacing.width40,
      width: Spacing.width40,
      height: Spacing.width40,
      borderWidth: 4,
      borderColor: themeColors.inputBorder,
    },
    itemColor: {
      borderRadius: Spacing.width30,
      width: Spacing.width30,
      height: Spacing.width30,
      borderWidth: 2,
      borderColor: themeColors.inputBorder,
    },
    txtInput: {
      alignItems: 'center',
      justifyContent: 'center',

      flex: 1,
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
      // width: Spacing.width200,
      height: Spacing.height150,
    },
    dropdownItemStyle: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.width12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Spacing.height12,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.inputBorder,
      gap: Spacing.width12,
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
