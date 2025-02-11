import {HeightScreen, Spacing, ThemeColors, WidthScreen} from '@theme';
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
      paddingHorizontal: Spacing.width16,
    },
    btnBack: {
      padding: 10,
      borderRadius: 50,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignSelf: 'flex-start',
    },
    btn: {
      width: WidthScreen,
      height: HeightScreen,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: WidthScreen,
      height: HeightScreen,
    },
    overlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    linear: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: themeColors.primary,
    },
    inactiveDot: {
      backgroundColor: themeColors.grey,
    },
  });
