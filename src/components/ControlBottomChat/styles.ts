import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {Platform, StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingTop: Spacing.width16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(41,41,41,1)',
      gap: Spacing.width16,
      minHeight: Spacing.height86,
    },
    viewInput: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.width16,
    },
    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: Spacing.width30,
    },
    iconButton: {
      width: Spacing.width40,
      height: Spacing.width30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      flex: 1,
      backgroundColor: 'rgba(41,41,41,1)',
      borderRadius: Spacing.height24,
      minHeight: Spacing.height48,
      paddingHorizontal: Spacing.width12,
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_400,
      marginLeft: Spacing.width16,
      color: themeColors.whiteColor,
      maxHeight: Spacing.height48 * 3,
      paddingTop: Platform.OS === 'android' ? undefined : Spacing.width16,
      paddingVertical: Spacing.width8,
      lineHeight: Spacing.width24,
    },
    inputFocused: {
      marginLeft: 0,
    },
    listGame: {
      height: Spacing.width112,
    },
    itemImageGame: {
      width: Spacing.width112,
      height: Spacing.width112,
      borderRadius: Spacing.width8,
    },
    imageGameSelect: {
      width: Spacing.width64,
      height: Spacing.width64,
      borderRadius: Spacing.width8,
    },
    viewName: {
      position: 'absolute',
      bottom: Spacing.width8,
      left: Spacing.width8,
      right: Spacing.width8,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: Spacing.width4,
    },
    txtNameGame: {
      color: themeColors.whiteColor,
      ...FontWithFamily.FontWithFamily_400,
      fontSize: FontSize.FontSize12,
      textAlign: 'center',
    },
    btnClose: {
      position: 'absolute',
      top: -Spacing.width8,
      right: -Spacing.width8,
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: Spacing.width24,
      height: Spacing.width24,
      borderRadius: Spacing.width12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
