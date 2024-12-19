import { LogoutIcon, SearchIcon } from '@assets';
import { navigate } from '@navigation';
import { DrawerActions } from '@react-navigation/native';
import { logout } from '@redux';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import { showModalConfirmation } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ItemRow } from './ItemRow';
interface DrawerMainProps {
  listNavigation: {
    name: string,
    key: string,
    Icon: any
  }[];
  listSettings: {
    name: string,
    key: string,
    Icon: any
  }[];
}
export const DrawerMain = ({ listNavigation, listSettings }: DrawerMainProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <ItemRow Icon={SearchIcon} title={t('drawer.search')} onPress={() => { }} styles={styles.search} labelStyle={styles.title} size={Spacing.width24} />
      <View style={styles.list}>
        <View style={styles.list1}>
          {listNavigation.map((item, index) => (
            <ItemRow key={item.key} Icon={item.Icon} title={item.name} labelStyle={styles.title} size={Spacing.width24} onPress={() => {
              dispatch(DrawerActions.closeDrawer());
              setTimeout(() => {
                navigate(item.key);
              }, 250); // Adjust the timeout as needed
            }} />
          ))}
        </View>
        <View style={styles.list2}>
          {listSettings.map((item, index) => (
            <ItemRow key={item.key} Icon={item.Icon} title={item.name} labelStyle={styles.title} size={Spacing.width24} onPress={() => { }} />
          ))}
          <ItemRow Icon={LogoutIcon} title={t('drawer.logout')} onPress={() => {
            showModalConfirmation({
              visible: true,
              icon: 'logout',
              title: t('drawer.logout'),
              message: t('drawer.logoutMessage'),
              onConfirm: () => {
                dispatch(logout());
              },

            });



          }} styles={styles.logout} labelStyle={styles.title} size={Spacing.width24} />

        </View>
      </View>
    </View>
  );
};
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: Spacing.width16,
      marginTop: Spacing.width32,
    },
    title: {
      fontSize: FontSize.FontSize16,



    },
    list: {
      marginTop: Spacing.width8,

    },
    list1: {
      // flex: 1,
      height: '50%',
    },
    list2: {
      // flex: 1,
      height: '50%',
    },

    search: {

      borderBottomWidth: 1,
      borderBottomColor: themeColors.btnSocial,

    },
    logout: {
      paddingTop: Spacing.width24,
      marginTop: Spacing.width8,
      borderTopWidth: 1,
      borderTopColor: themeColors.btnSocial,

    },
  });
