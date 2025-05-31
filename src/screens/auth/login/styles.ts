import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: Spacing.width16,
    },
    txtTitle: {
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
      textAlign: 'center',
      width: '95%',
      color: themeColors.text,
      marginBottom: Spacing.height24,
    },
    btnLogin: {
      marginTop: Spacing.height50,
    },
    btnForgot: {
      alignSelf: 'flex-end',
      marginBottom: Spacing.width16,
    },
    txtForgot: {
      fontSize: FontSize.FontSize14,
      color: themeColors.txtLink,
      ...FontWithFamily.FontWithFamily_600,
    },
    viewAreYouAccount: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Spacing.width16,
    },
    txtAreYouAccount: {
      ...FontWithFamily.FontWithFamily_400,
    },
    createAccount: {
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.txtLink,
    },
  });
