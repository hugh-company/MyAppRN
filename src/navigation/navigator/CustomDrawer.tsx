import { AppButton, AppImage, AppText } from '@components';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { drawerSettingSelector, getToken } from '@redux';
import { FontSize, FontWithFamily, Spacing, ThemeColors } from '@theme';
import { menuNavigationInterface } from '@types';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../theme/ThemeContext';
import { navigate } from '../NavigationUtils';
import { SCREEN_ROUTE } from '../router';
import { HeaderDrawer } from './components/HeaderDrawer';
import { ItemRow } from './components/ItemRow';

interface CustomDrawerProps extends DrawerContentComponentProps {
  // Add your custom props here

}

const CustomDrawer = React.memo((props: CustomDrawerProps) => {
  const { themeColors } = useTheme(); // Moved inside the function component
  const token = useSelector(getToken);
  const { bottom, top } = useSafeAreaInsets();
  const styles = createStyles(themeColors);
  const colors = ['#B1062E', '#1E1111'];
  const dataMenus = useSelector(drawerSettingSelector);
  const dispatch = useDispatch();
  const gotoScreen = useCallback((screen: string) => {
    dispatch(DrawerActions.closeDrawer());

    setTimeout(() => {
      navigate(screen);
    }, 250);
  }, [dispatch]);
  const renderBlockAuth = (item: menuNavigationInterface) => {
    return (
      <View>
        <AppText style={styles.description}>{item?.label}</AppText>
        <View style={styles.viewAuth}>
          {item?.items?.map((_, index) => (
            <AppButton key={index} style={[styles.btnLogin, { backgroundColor: _?.color }]} label={_?.label} onPress={() => {
              gotoScreen(_?.name === SCREEN_ROUTE.LOGIN ? SCREEN_ROUTE.LOGIN : SCREEN_ROUTE.REGISTER);
            }} />
          ))}
        </View>
      </View>
    );
  };
  const renderItem = ({ item }: { item: menuNavigationInterface }) => {
    switch (item.name) {
      case 'search':
        return <ItemRow linkImage={item?.icon} title={item?.label} onPress={() => { }} styles={styles.search} size={Spacing.width28} />;
      case 'dash':
        return <AppImage uri={item?.icon} style={styles.logo} />;
      case 'login':
        return renderBlockAuth(item);
      default:
        return <ItemRow linkImage={item?.icon} title={item?.label} onPress={() => { }} size={Spacing.width28} />;
    }
  };
  console.log({ dataMenus });

  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={colors}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        useAngle={true} // Added this line
        angle={45} // Added this line
      >
        <FlatList
          data={dataMenus}
          ListHeaderComponent={<HeaderDrawer />}
          style={{ marginTop: top, marginBottom: bottom, marginHorizontal: Spacing.width16 }}
          keyExtractor={(item, index) => `drawer_${index}`}
          renderItem={renderItem}
        />

        {/* {token ? <DrawerMain listSettings={dataSettings} listNavigation={dataNavigation} /> : <DrawerAuth listNavigation={dataNavigation} />} */}
      </LinearGradient>
    </View>
  );
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
  });

export default CustomDrawer;
