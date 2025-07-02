import {
  FontSize,
  FontWithFamily,
  HeightScreen,
  Spacing,
  ThemeColors,
  WidthScreen,
} from '@theme';
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
    headerBackground: {
      ...StyleSheet.absoluteFillObject,
      width: WidthScreen,
      height: HeightScreen / 2,
    }, // Added style for background

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
      width: '100%',
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
    viewAreYouAccount: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Spacing.width16,
      marginBottom: Spacing.height50,
    },
    txtAreYouAccount: {
      ...FontWithFamily.FontWithFamily_400,
    },
    createAccount: {
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.txtLink,
    },
  });
