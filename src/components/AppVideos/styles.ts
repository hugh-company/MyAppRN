import {ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      height: 300, // Adjust height based on your design
      width: '100%',
    },
  });
