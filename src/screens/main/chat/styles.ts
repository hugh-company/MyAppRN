import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
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
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    containerList: {
      flex: 1,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    chatContainer: {
      // flex: 1,
      paddingHorizontal: Spacing.width16,
    },
    list: {
      flex: 1,
      paddingVertical: Spacing.height24,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingVertical: Spacing.width10,
      paddingHorizontal: Spacing.width16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(41,41,41,1)',
    },
    input: {
      flex: 1,
      backgroundColor: 'rgba(41,41,41,1)',
      borderRadius: Spacing.height48,
      height: Spacing.height48,
      paddingHorizontal: Spacing.width12,
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_400,
      marginLeft: Spacing.width16,
    },
    iconButton: {
      width: Spacing.width40,
      height: Spacing.width30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewOption: {
      flexDirection: 'row',

      alignItems: 'center',
    },
    btnOption: {},
  });
