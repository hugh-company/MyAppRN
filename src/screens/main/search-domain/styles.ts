import {FontSize, FontWithFamily, Shadow, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    header: {
      ...Shadow.normal,
      borderBottomColor: themeColors.border,
      borderBottomWidth: 1,
    },
    inputSearch: {
      margin: Spacing.width16,
    },
    viewCategory: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.width16,
    },
    viewGoDaddy: {},
    viewNameCom: {},
    listContent: {
      flexGrow: 1,
      paddingHorizontal: Spacing.width16,
      paddingBottom: Spacing.width16,
    },
    recommendationContainer: {
      marginVertical: Spacing.width8,
    },
    txtRecommendation: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.text,
    },
    continueButton: {
      backgroundColor: themeColors.primary,
      padding: Spacing.width8,
      marginHorizontal: Spacing.width16,
      marginBottom: Spacing.width16,
      marginTop: Spacing.width8,
      borderRadius: 8,
      alignItems: 'center',
    },
    viewBottom: {
      borderTopColor: themeColors.border,
      borderTopWidth: 1,
    },
    continueButtonDisabled: {
      backgroundColor: themeColors.disable,
    },
    continueButtonText: {
      color: themeColors.whiteColor,
      fontSize: FontSize.FontSize12,
    },
    loadingText: {
      fontSize: FontSize.FontSize16,
      textAlign: 'center',
      marginVertical: Spacing.width16,
      color: themeColors.text,
    },
    notFoundText: {
      fontSize: FontSize.FontSize16,
      textAlign: 'center',
      marginVertical: Spacing.width16,
      color: themeColors.text,
    },
    extraDomainContainer: {
      marginVertical: Spacing.width10,
      paddingHorizontal: Spacing.width16,
    },
    extraDomainRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.width8,
    },
    extraDomainText: {
      flex: 1,
      fontSize: FontSize.FontSize16,
      color: themeColors.text,
    },
    btnGoDaddy: {
      flex: 1,
      backgroundColor: themeColors.primary,
      padding: Spacing.width8,
      marginRight: Spacing.width8,
      borderRadius: 8,
      alignItems: 'center',
    },
    btnNameCom: {
      flex: 1,
      backgroundColor: themeColors.secondary,
      padding: Spacing.width8,
      marginLeft: Spacing.width8,
      borderRadius: 8,
      alignItems: 'center',
    },
    activeButton: {
      borderWidth: 2,
      borderColor: themeColors.highlight, // Highlight color for active state
    },

    iconGoDaddy: {
      width: Spacing.width80,
      height: Spacing.width24,
    },
    iconNameCom: {
      width: Spacing.width80,
      height: Spacing.width24,
      // tintColor: themeColors.whiteColor,
    },
  });
