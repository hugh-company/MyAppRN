import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginHorizontal: Spacing.width16,
    },
    title: {
      fontSize: FontSize.FontSize16,
      color: '#EDEDED',
      ...FontWithFamily.FontWithFamily_600,
    },
    btnItem: {},
    image: {
      borderRadius: 4,
    },
    viewName: {
      // width: '80%',
      position: 'absolute',
      bottom: Spacing.width8,
      left: Spacing.width8,
      right: Spacing.width8,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      borderRadius: 4,
      alignSelf: 'center',
    },
    txtName: {
      fontSize: FontSize.FontSize12,
      ...FontWithFamily.FontWithFamily_600,
    },
  });
