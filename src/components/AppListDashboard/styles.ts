import {
  FontSize,
  FontWithFamily,
  Spacing,
  ThemeColors,
  WidthScreen,
} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    // banner
    banner: {
      width: WidthScreen,
      height: Spacing.height240,
      paddingHorizontal: Spacing.width16,
    },
    imageBanner: {
      borderWidth: 1,
      borderColor: themeColors.btnSocial,
      borderRadius: Spacing.width16,
      overflow: 'hidden',
    },
    gradient: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '50%',
      left: Spacing.width16,
      right: Spacing.width16,
      paddingTop: Spacing.height12,
    },
    bodyBanner: {
      paddingHorizontal: Spacing.width16,
      flexDirection: 'row',
      justifyContent: 'space-between',

      gap: Spacing.width16,
    },
    viewInfo: {
      flex: 1,
    },
    btnPlay: {
      backgroundColor: themeColors.primary,
      width: Spacing.width48,
      height: Spacing.width48,
      borderRadius: Spacing.width40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nameMovie: {
      fontSize: FontSize.FontSize18,
      ...FontWithFamily.FontWithFamily_600,
    },

    viewOption: {
      flexDirection: 'row',
      alignItems: 'center',

      marginTop: Spacing.width16,
      gap: Spacing.width16,
    },
    txtView: {
      fontSize: FontSize.FontSize14,
    },
    txtLike: {
      fontSize: FontSize.FontSize12,
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    },
    //
  });
