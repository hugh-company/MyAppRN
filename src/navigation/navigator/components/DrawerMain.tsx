import { ImagePackage, LogoutIcon, SearchIcon, VipIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { navigate } from '@navigation';
import { DrawerActions } from '@react-navigation/native';
import { logout } from '@redux';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
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
  const renderBackground = () => {

  };
  return (
    <View style={styles.container}>
      <ItemRow Icon={SearchIcon} title={t('drawer.search')} onPress={() => { }} styles={styles.search} labelStyle={styles.title} size={Spacing.width32} />
      <View style={styles.list}>
        <View style={styles.list1}>
          {listNavigation.map((item, index) => (
            <ItemRow key={item.key} Icon={item.Icon} title={item.name} labelStyle={styles.title} size={Spacing.width32} onPress={() => {
              dispatch(DrawerActions.closeDrawer());
              setTimeout(() => {
                navigate(item.key);
              }, 250); // Adjust the timeout as needed
            }} />
          ))}
        </View>
        <View style={styles.list2}>
          <View style={styles.viewRank} >
            <View>
              <AppImage defaultSource={ImagePackage} style={styles.package} />
              <View style={styles.iconVip}>
                <VipIcon />
              </View>
            </View>
            <View style={{ gap: Spacing.width4 }}>
              <AppText style={styles.txtRank}>
                {t('drawer.package_member')}
              </AppText>
              <AppText style={styles.txtDesRank}>
                {t('drawer.rank_membership')}
              </AppText>
            </View>
          </View>
          {/* rank */}

          {/*  */}
          {listSettings.map((item, index) => (
            <ItemRow key={item.key} Icon={item.Icon} title={item.name} labelStyle={styles.title} size={Spacing.width32} onPress={() => { }} />
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
      // marginTop: Spacing.width16,
    },
    title: {
      fontSize: FontSize.FontSize16,



    },
    list: {
      marginTop: Spacing.width8,


    },
    list1: {


    },
    list2: {
      marginTop: Spacing.width50,

    },

    search: {

      borderBottomWidth: 1,
      borderBottomColor: themeColors.text,

    },
    logout: {
      paddingTop: Spacing.width24,
      marginTop: Spacing.width8,
      borderTopWidth: 1,
      borderTopColor: themeColors.btnSocial,

    },
    viewRank: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width12,
      marginTop: Spacing.width16,
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
