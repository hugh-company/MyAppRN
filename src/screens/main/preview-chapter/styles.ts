import {position} from '@shopify/restyle';
import {Spacing, ThemeColors, WidthScreen} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    item: {},

    imageContainer: {
      marginBottom: 15,
      alignItems: 'center',
    },
    image: {
      width: WidthScreen,
    },
    btnBack: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Spacing.width16,
      paddingBottom: Spacing.width12,
    },
    positionHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    headerText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Spacing.width16,
      paddingBottom: Spacing.width16,
    },
    containerListText: {
      marginHorizontal: Spacing.width16,
    },
    containerList: {
      marginHorizontal: Spacing.width16,
    },
  });
