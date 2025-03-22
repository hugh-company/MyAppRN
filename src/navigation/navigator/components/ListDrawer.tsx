import { apiService } from '@api';
import { VipIcon } from '@assets';
import { AppButton, AppImage, AppText } from '@components';
import { navigate, navigateToStack, reset, SCREEN_ROUTE } from '@navigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { clearAllChat, clearSavedPost, clearSearchThreads, clearSocketInfoUser, getToken, getUserInfo, logout } from '@redux';
import { useDashboardHome } from '@services';
import { FontSize, FontWithFamily, sizeWidth, Spacing, ThemeColors, useTheme } from '@theme';
import { menuNavigationInterface, PostTypeKey } from '@types';
import { showModalConfirmation, showModalLanguage } from '@utils';
import { t } from 'i18next';
import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { ItemRow } from './ItemRow';

export interface ListDrawerProps {
  navigation: {
    closeDrawer: () => void;
  };
}

export function ListDrawer(props: ListDrawerProps) {
  const { bottom, top } = useSafeAreaInsets();
  const { themeColors } = useTheme(); // Moved inside the function component
  const token = useSelector(getToken);
  const infoUser = useSelector(getUserInfo);
  const { data, isSuccess } =
    useDashboardHome();
  const styles = createStyles(themeColors);
  const dataMenus = useMemo(() => (isSuccess ? data?.data?.menus ?? [] : []), [isSuccess, data]);

  const dispatch = useDispatch();

  const onLogoutAccount = () => {
    GoogleSignin.signOut();
    apiService.reset();
    dispatch(logout());
    apiService.clear();
    dispatch(clearAllChat());
    dispatch(clearSavedPost());
    dispatch(clearSearchThreads());
    dispatch(clearSocketInfoUser());
    reset(SCREEN_ROUTE.MAIN_STACK);
    dispatch({ type: 'USER_LOGOUT' });
  };

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
      <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.WEBVIEW)} style={styles.viewRank} >
        <View>
          <AppImage uri={infoUser?.avatar} style={styles.package} />
          <View style={styles.iconVip}>
            <VipIcon />
          </View>
        </View>
        <View style={{ gap: Spacing.width4 }}>
          <AppText style={styles.txtRank}>
            {item?.items?.[infoUser?.package_name || 'membership'].label}
          </AppText>
          <AppText style={styles.txtDesRank}>
            {t('drawer.totalPriceAccount')}
            <AppText style={styles.txtTotal}>{infoUser?.coin || 0}</AppText>
          </AppText>
        </View>
      </TouchableOpacity>
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
        gotoScreen(SCREEN_ROUTE.DATING);
        break;
      case 'savedContents':
        gotoScreen(SCREEN_ROUTE.SAVED_CONTENTS, { title: item?.label });
        break;
      case 'historyContents':
        gotoScreen(SCREEN_ROUTE.HISTORY_CONTENTS, { title: item?.label });
        break;
      case 'languages':
        showModalLanguage(true);
        break;
      case 'savedMovies':
        gotoScreen(SCREEN_ROUTE.SAVED_POST, { type: PostTypeKey.MOVIES });
        break;
      case 'savedGames':
        gotoScreen(SCREEN_ROUTE.SAVED_POST, { type: PostTypeKey.GAMES });
        break;
      case 'savedComics':
        gotoScreen(SCREEN_ROUTE.SAVED_POST, { type: PostTypeKey.COMIC });
        break;

      case 'logout':
        showModalConfirmation({
          visible: true,
          icon: 'logout',
          title: t('drawer.logout'),
          message: t('drawer.logoutMessage'),
          onConfirm: () => {
            onLogoutAccount();
          },
          onCancel: () => { },

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
      // case 'line':
      //   return <View style={[styles.line, { backgroundColor: item?.color }]} />;
      default:
        return <></>;
    }
  }, [clickTypeMenu, renderBlockMenu, styles]);
  const dataSettings = useMemo(() => {
    return token ? dataMenus?.filter((_) => _.isLogin === true || !_.hasOwnProperty('isLogin')) :
      dataMenus.filter((_) => _.isLogin === false || !_.hasOwnProperty('isLogin')).filter((_) => _.name !== 'chat');
  }, [token, dataMenus]);

  return (
    <LinearGradient
      colors={['rgba(209, 16, 48, 0.72)', 'rgba(1, 1, 1, 0.72)']}
      style={styles.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {/* <BlurView style={styles.blurBackground} blurAmount={10} > */}
      {isSuccess && (
        <FlatList
          data={dataSettings}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={<HeaderDrawer />}
          style={{ marginTop: top, marginBottom: bottom, marginHorizontal: Spacing.width16 }}
          keyExtractor={(item, index) => `drawer_${index}`}
          renderItem={renderItem}
        />
      )}
      {/* </BlurView> */}
    </LinearGradient >
  );
}


const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: themeColors.background,
      flex: 1,
    },
    gradientBackground: {
      flex: 1,

      width: '100%',
      height: '100%',
      borderRadius: 10,

      overflow: 'hidden',
      shadowColor: '#fff',
      shadowOffset: { width: -8, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 24,
      backgroundColor: 'transparent',

    },
    blurBackground: {
      ...StyleSheet.absoluteFillObject, // Fill the entire background
      flex: 1,

      width: '100%',
      height: '100%',
    },
    listContainer: {
      flex: 1,
      // backgroundColor: 'rgba(209, 16, 48, 0.72)',
      boxShadow: '4px 0px 4px 0px #00000040',
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
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
      color: themeColors.whiteColor,
    },
    txtTotal: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.whiteColor,
    },
    package: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.width20,
    },
    iconVip: {
      position: 'absolute',
      bottom: -Spacing.width8,
      left: -Spacing.width8,
    },
  });
