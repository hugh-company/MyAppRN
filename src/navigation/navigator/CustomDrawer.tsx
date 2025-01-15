import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { FontSize, FontWithFamily, Spacing, ThemeColors } from '@theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ListDrawer } from './components/ListDrawer';

interface CustomDrawerProps extends DrawerContentComponentProps {
  // Add your custom props here

}

const CustomDrawer = React.memo((props: CustomDrawerProps) => {
  return <ListDrawer {...props} />;
});

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: themeColors.background,
      flex: 1,
    },
    gradient: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    viewImage: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.width32,
      marginTop: Spacing.width16,
    },
    image: {
      width: Spacing.width60,
      height: Spacing.width60,
    },

    body: {
      paddingHorizontal: Spacing.width32,
      marginTop: Spacing.width16,
    },
    search: {

      borderBottomWidth: 1,
      borderBottomColor: themeColors.text,

    },
    logo: {
      width: Spacing.width137,
      height: Spacing.width58,
      alignSelf: 'flex-start',
    },
    description: {
      // background: var(--Content-on-surface, #EDEDED);

      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_400,
      color: '#EDEDED',
      marginTop: Spacing.width12,
    },
    viewAuth: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Spacing.width32,
      gap: Spacing.width8,

    },
    btnLogin:
    {
      width: '38%',
      backgroundColor: themeColors.primary,
      borderRadius: Spacing.width44,
    },
    btnRegister: {
      width: '44%',
      backgroundColor: themeColors.btnSocial,

      borderRadius: Spacing.width44,

    },
    line: {
      height: 1,
      width: '100%',

    },
    viewRank: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width12,

      backgroundColor: themeColors.btnSocial,
      borderRadius: Spacing.width8,
      paddingHorizontal: Spacing.width8,
      height: Spacing.width64,
      marginBottom: Spacing.width8,
    },
    txtRank: {
      fontSize: FontSize.FontSize16,
      color: themeColors.onSurface,
    },
    txtDesRank: {
      fontSize: FontSize.FontSize18,
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.onSurface,
    },
    package: {
      width: Spacing.width40,
      height: Spacing.width40,
    },
    iconVip: {
      position: 'absolute',
      bottom: -Spacing.width8,
      left: -Spacing.width8,
    },
  });

export default CustomDrawer;
