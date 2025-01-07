import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    title: {
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
    },
    description: {
      marginTop: Spacing.width8,
    },
    body: {
      marginHorizontal: Spacing.width16,
    },
    avatar: {
      width: Spacing.width99,
      height: Spacing.width99,
      borderRadius: Spacing.width25,
    },
    btnAvatar: {
      marginVertical: Spacing.height48,
    },
    btn: {
      alignSelf: 'flex-end',
      width: Spacing.width132,
      marginTop: Spacing.height32,
    },
  });
