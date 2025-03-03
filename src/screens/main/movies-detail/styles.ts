import {
  FontSize,
  FontWithFamily,
  HeightScreen,
  Spacing,
  ThemeColors,
} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    banner: {
      width: '100%',
      height: HeightScreen / 2,
    },
    itemImage: {
      width: Spacing.width120,
    },
    btnDots: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    episodes: {
      marginHorizontal: Spacing.width16,
      marginTop: Spacing.width16,
    },
    infoRow: {
      marginHorizontal: Spacing.width16,
    },
    viewInfo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: HeightScreen / 3,
      justifyContent: 'flex-end',
    },
    gradient: {
      width: '100%',
      height: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnPlay: {
      backgroundColor: themeColors.primary,
      borderRadius: Spacing.width88,
      width: Spacing.width120,
      height: Spacing.width44,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Spacing.width8,
    },
    txtPlay: {
      fontSize: FontSize.FontSize16,
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_600,
    },
    body: {
      marginHorizontal: Spacing.width16,
    },
    txtName: {
      fontSize: FontSize.FontSize24,
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_600,
      textAlign: 'center',
    },
    paddingBottom: {
      paddingBottom: Spacing.width50,
    },
    infoMovie: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
