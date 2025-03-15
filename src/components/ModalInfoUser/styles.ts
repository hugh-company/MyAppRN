import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    info: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: Spacing.width16,
      paddingVertical: Spacing.height8,
    },
    name: {
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
      color: '#fff',
    },
    profession: {
      fontSize: FontSize.FontSize16,
    },
    viewRow: {
      flex: 1,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.width16,
      gap: Spacing.width8,
    },
    viewLocation: {
      flexDirection: 'row',
      alignItems: 'center',

      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'absolute',
      left: Spacing.width16,
      top: Spacing.width16,
      borderRadius: 20,
      padding: Spacing.width4,

      gap: Spacing.width4,
    },
    txtLocation: {
      fontSize: FontSize.FontSize12,
      color: '#fff',
      ...FontWithFamily.FontWithFamily_600,
    },
    contentContainerStyle: {
      flexGrow: 1,
    },
    btnStatus: {
      height: Spacing.width48,
      borderRadius: Spacing.width90,
      backgroundColor: themeColors.btnSocial,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: Spacing.width16,
    },
    txtBtnStatus: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_600,
    },
    viewAbout_me: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width8,
      marginBottom: Spacing.width8,
      marginHorizontal: Spacing.width16,
    },
    titleAboutMe: {
      color: themeColors.onSurface,
    },
    valueAbout_me: {
      backgroundColor: themeColors.btnSocial,
      padding: Spacing.width16,
      marginHorizontal: Spacing.width16,
      borderRadius: Spacing.width8,
    },
    list_game: {},
    viewInfo: {
      borderRadius: Spacing.width8,
      borderWidth: 1,
      borderColor: themeColors.inputBorder,
      padding: Spacing.width16,
      marginHorizontal: Spacing.width16,
      marginTop: Spacing.width32,
    },
    view_contact: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: Spacing.width16,
      marginBottom: Spacing.width16,
    },
    viewIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: Spacing.width16,
    },
    btnChat: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.width4,
      backgroundColor: themeColors.primary,
      borderRadius: Spacing.width88,
      paddingHorizontal: Spacing.width16,
      paddingVertical: Spacing.width12,
    },
    txtChat: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_600,
    },
    viewListInfo: {
      gap: Spacing.width16,
    },
    viewInfoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width8,
    },
  });
