import {FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    txt: {
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_600,
    },
    containerSizeSmall: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.width24,
      backgroundColor: themeColors.backgroundPlaceholder,
      padding: Spacing.width16,
      borderRadius: Spacing.width100,
    },
  });
