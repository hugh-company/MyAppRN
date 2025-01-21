import {
  FontSize,
  FontWithFamily,
  Spacing,
  ThemeColors,
  WidthScreen,
} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    title: {
      color: themeColors.subtile,
      fontSize: FontSize.FontSize12,
      marginBottom: Spacing.height8,
    },
    btnMore: {
      alignItems: 'center',
      paddingVertical: Spacing.height16,
      justifyContent: 'center',
    },
    txtMore: {
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.txtLink,
    },
    listChapter: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: Spacing.height8,
      height: Spacing.height32 * 2 + Spacing.height8,
      overflow: 'hidden',
    },
    btnChapter: {
      borderRadius: Spacing.height6,
      backgroundColor: themeColors.btnSocial,
      width: WidthScreen / 5 - Spacing.width16,
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
    // modal
    modalContainer: {
      flex: 1,
      // backgroundColor: themeColors.background,
    },
    headerModal: {
      padding: Spacing.width16,

      backgroundColor: '#181818',
    },
    viewTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    line: {
      height: 5,
      width: Spacing.width36,
      borderRadius: Spacing.width2,
      backgroundColor: themeColors.border,
      alignSelf: 'center',
      position: 'absolute',
      top: 4,
    },
    btnBack: {
      // padding: Spacing.width16,
    },
    txtBack: {
      ...FontWithFamily.FontWithFamily_400,
      color: themeColors.text,
      fontSize: FontSize.FontSize16,
    },
    titleModal: {
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.text,
      fontSize: FontSize.FontSize16,
      position: 'absolute',
      left: 0,
      flex: 1,
      paddingVertical: Spacing.width16,
      right: 0,
      textAlign: 'center',
      marginHorizontal: Spacing.width50,
    },
    viewSearch: {
      marginTop: Spacing.width16,
    },
    inputSearch: {
      backgroundColor: '#7878803D',
    },
    itemChapter: {
      padding: Spacing.width16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    txtChapterItem: {
      fontSize: FontSize.FontSize16,
      color: themeColors.disable,
      fontStyle: 'italic',
      ...FontWithFamily.FontWithFamily_400,
    },
  });
