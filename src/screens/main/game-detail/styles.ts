import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    infoRow: {
      marginHorizontal: Spacing.width16,
    },
    btnPlay: {
      backgroundColor: themeColors.primary,
      borderRadius: Spacing.width88,

      height: Spacing.width44,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      alignSelf: 'center',
      gap: Spacing.width8,
      paddingHorizontal: Spacing.width32,
    },
    txtPlay: {
      fontSize: FontSize.FontSize16,
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_600,
    },
    itemImage: {
      width: Spacing.width120,
    },
  });
