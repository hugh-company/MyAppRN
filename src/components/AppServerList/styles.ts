import {FontSize, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: Spacing.width16,
    },
    title: {
      color: themeColors.subtile,
      fontSize: FontSize.FontSize12,
      marginBottom: Spacing.height8,
    },

    list: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: Spacing.height8,

      overflow: 'hidden',
    },
    btnChapter: {
      borderRadius: Spacing.height6,
      backgroundColor: themeColors.btnSocial,
      paddingHorizontal: Spacing.width8,
      height: Spacing.height32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    txtChapter: {
      color: themeColors.subtile,
      fontSize: FontSize.FontSize16,
    },
    btnChapterActive: {
      backgroundColor: themeColors.primary,
    },
    txtChapterActive: {
      color: themeColors.text,
    },
  });
