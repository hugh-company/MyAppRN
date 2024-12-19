import { InternetIcon, SearchIcon } from '@assets';
import { AppButton, AppText } from '@components';
import { navigate, navigateToStack, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { showModalLanguage } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ItemRow } from './ItemRow';

interface DrawerAuthProps {
  listNavigation: {
    name: string,
    key: string,
    Icon: any
  }[];
}
export const DrawerAuth = ({ listNavigation }: DrawerAuthProps) => {

  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{t('drawer.title')}</AppText>
      <AppText style={styles.description}>{t('drawer.description')}</AppText>
      <View style={styles.viewAuth}>
        <AppButton style={styles.btnLogin} label={t('drawer.login')} onPress={() => {
          navigateToStack(SCREEN_ROUTE.AUTH_STACK, SCREEN_ROUTE.LOGIN);
        }} />
        <AppButton style={styles.btnRegister} label={t('drawer.register')} onPress={() => navigateToStack(SCREEN_ROUTE.AUTH_STACK, SCREEN_ROUTE.REGISTER)} />
      </View>
      <ItemRow Icon={SearchIcon} key={'search'} title={t('drawer.search')} onPress={() => { }} styles={styles.search} />
      <View style={styles.listMenuAuth}>
        {listNavigation.map((item, index) => (
          <ItemRow key={item.key} Icon={item.Icon} title={item.name} onPress={() => navigate(item.key)} />
        ))}
      </View>
      <ItemRow Icon={InternetIcon} title={t('drawer.language')} onPress={() => showModalLanguage(true)} styles={styles.language} key={'language'} />
    </View>
  );
};
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: Spacing.width16,
      marginTop: Spacing.width48,
    },
    title: {
      fontSize: FontSize.FontSize38,
      ...FontWithFamily.FontWithFamily_700,
      color: themeColors.primary,

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
    listMenuAuth: {
      marginTop: Spacing.width8,

    },
    search: {
      marginTop: Spacing.width32,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.btnSocial,

    },
    language: {
      marginTop: Spacing.width32,
      borderTopWidth: 1,
      borderTopColor: themeColors.btnSocial,

    },
  });
