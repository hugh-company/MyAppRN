import { VipIcon } from '@assets';
import { AppButton, AppImage, AppText } from '@components';
import { navigate, navigateToStack, SCREEN_ROUTE } from '@navigation';
import { drawerSettingSelector, getToken, logout } from '@redux';
import { FontSize, FontWithFamily, sizeWidth, Spacing, ThemeColors, useTheme } from '@theme';
import { menuNavigationInterface, PostTypeKey } from '@types';
import { showModalConfirmation, showModalLanguage } from '@utils';
import { t } from 'i18next';
import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderDrawer } from './HeaderDrawer';
import { ItemRow } from './ItemRow';
export interface ListDrawerProps {

}

export function ListDrawer(props: ListDrawerProps) {
  const { bottom, top } = useSafeAreaInsets();
  const { themeColors } = useTheme(); // Moved inside the function component
  const token = useSelector(getToken);

  const styles = createStyles(themeColors);
  const dataMenus = useSelector(drawerSettingSelector);
  const colors = ['#B1062E', '#1E1111'];
  const dispatch = useDispatch();
  const gotoScreen = useCallback((screen: string, params?: any) => {
    props?.navigation?.closeDrawer();
    setTimeout(() => {
      navigate(screen, { ...params });
    }, 250);
  }, [dispatch]);


  const renderBlockAuth = useCallback((item: menuNavigationInterface) => {
    return (
      <View>
        <AppText style={styles.description}>{item?.label}</AppText>
        <View style={styles.viewAuth}>
          {item?.items?.map((_, index) => (
            <AppButton key={index} style={[styles.btnLogin, { backgroundColor: _?.color }]} label={_?.label} onPress={() => {
              // gotoScreen(_?.name === SCREEN_ROUTE.LOGIN ? SCREEN_ROUTE.LOGIN : SCREEN_ROUTE.REGISTER);


              navigateToStack(SCREEN_ROUTE.AUTH_STACK, _?.name === 'login' ? SCREEN_ROUTE.LOGIN : SCREEN_ROUTE.REGISTER);
              props?.navigation?.closeDrawer();

            }} />
          ))}
        </View>
      </View>
    );
  }, [gotoScreen, styles]);
  const renderPackage = useCallback((item: menuNavigationInterface) => {
    return (
      <View style={styles.viewRank} >
        <View>
          <AppImage uri={item?.icon} style={styles.package} />
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
    );
  }, [styles]);
  const renderBlockMenu = useCallback((item: menuNavigationInterface) => {
    switch (item.name) {
      case 'logo':
        return <AppImage resizeMode={'stretch'} uri={item?.icon} style={styles.logo} />;
      case 'login':
        return renderBlockAuth(item);
      case 'user':
        return renderPackage(item);
      case 'search':
        return <ItemRow linkImage={item?.icon} title={item?.label} onPress={() => {
          clickTypeMenu(item);
        }} size={Spacing.width28} />;
      default:
        return <></>;
    }
  }, [renderBlockAuth, renderPackage, styles]);
  const clickTypeMenu = useCallback((item: menuNavigationInterface) => {
    console.log(item.name);

    switch (item.name) {
      case 'search':
        gotoScreen(SCREEN_ROUTE.SEARCH_SCREEN);
        break;
      case 'home':
        gotoScreen(SCREEN_ROUTE.HOME);
        break;
      case 'comic':
        gotoScreen(SCREEN_ROUTE.COMIC);
        break;
      case 'movie':
        gotoScreen(SCREEN_ROUTE.MOVIES);
        break;
      case 'game':
        gotoScreen(SCREEN_ROUTE.GAMES);
        break;
      case 'chat':
        gotoScreen(SCREEN_ROUTE.CREATE_PROFILE);
        break;
      case 'languages':


        showModalLanguage(true);
        break;
      case 'savedMovies':
        gotoScreen(SCREEN_ROUTE.FAVORITE, { type: PostTypeKey.MOVIES });
        break;
      case 'savedGames':
        gotoScreen(SCREEN_ROUTE.FAVORITE, { type: PostTypeKey.GAMES });
        break;
      case 'savedComics':
        gotoScreen(SCREEN_ROUTE.FAVORITE, { type: PostTypeKey.COMIC });
        break;

      case 'logout':
        showModalConfirmation({
          visible: true,
          icon: 'logout',
          title: t('drawer.logout'),
          message: t('drawer.logoutMessage'),
          onConfirm: () => {
            dispatch(logout());
          },

        });
        break;
      default:
        break;
    }
  }, [dispatch, gotoScreen]);

  const renderItem = useCallback(({ item }: { item: menuNavigationInterface }) => {

    switch (item.type) {
      case 'block':
        return renderBlockMenu(item);
      case 'space':
        return <View style={{ height: sizeWidth(item?.height || 0) }} />;
      case 'menu':
        return <ItemRow linkImage={item?.icon} title={item?.label} onPress={() => {
          clickTypeMenu(item);
        }} size={Spacing.width28} />;
      case 'line':
        return <View style={[styles.line, { backgroundColor: item?.color }]} />;
      default:
        return <></>;
    }
  }, [clickTypeMenu, renderBlockMenu, styles]);
  const dataSettings = useMemo(() => {
    return token ? dataMenus.filter((_) => _.isLogin === true || !_.hasOwnProperty('isLogin')) : dataMenus.filter((_) => _.isLogin === false || !_.hasOwnProperty('isLogin'));
  }, [token, dataMenus]);

  return <LinearGradient
    colors={colors}
    style={styles.gradient}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    useAngle={true} // Added this line
    angle={45} // Added this line
  >
    <FlatList
      data={dataSettings}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<HeaderDrawer />}
      style={{ marginTop: top, marginBottom: bottom, marginHorizontal: Spacing.width16 }}
      keyExtractor={(item, index) => `drawer_${index}`}
      renderItem={renderItem}
    />
  </LinearGradient>;
}


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
