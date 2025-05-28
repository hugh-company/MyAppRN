import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getToken, getUserInfo } from '@redux';

import { GiftIcon, HomeIcon, ProfileIcon, SupportIcon } from '@assets';
import { AppText, PhoneCallFloatingButton } from '@components';
import { HomeScreen, ProfileScreen, SupportScreen } from '@screens';
import { FontSize, FontWithFamily, Spacing, useTheme } from '@theme';
import React, { useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const TabBarNavigation = React.memo(() => {
  const userInfo = useSelector(getUserInfo);
  const token = useSelector(getToken);
  const tabRef = useRef(null);          // để ẩn/hiện thanh bar
  const { themeColors } = useTheme();



  /* ==== 2. Khai báo tab – icon – vị trí ==== */
  const TABS = [
    { name: 'Trang chủ', key: 'home', component: HomeScreen, icon: <HomeIcon />, position: 'LEFT' },
    { name: 'Quà tặng', key: "gift", component: GiftIcon, icon: <GiftIcon />, position: 'LEFT' },
    { name: 'Hỗ trợ', key: 'support', component: SupportScreen, icon: <SupportIcon />, position: 'RIGHT' },
    { name: 'Tài khoản', key: 'account', component: ProfileScreen, icon: <ProfileIcon />, position: 'RIGHT' },
  ] as const;


  /* ==== Icon cho từng route ==== */
  const renderIcon = (routeKey: string, selectedTab: string) => {
    const isActive = selectedTab === routeKey;
    switch (routeKey) {
      case 'home':
        return <HomeIcon size={Spacing.width24} color={isActive ? themeColors.primary : themeColors.textTertiary} />;
      case 'gift':
        return <GiftIcon color={isActive ? themeColors.primary : themeColors.textTertiary} />;
      case 'support':
        return <SupportIcon color={isActive ? themeColors.primary : themeColors.textTertiary} />;
      case 'account':
        return <ProfileIcon color={isActive ? themeColors.primary : themeColors.textTertiary} />;
      default:
        return null;
    }
  };
  /* ==== JSX của từng ô tab ==== */
  const renderTabBar = ({ routeName, selectedTab, navigate, route }: any) => {
    // routeName chính là key
    const tab = TABS.find(t => t.key === routeName);
    return (
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigate(routeName)}>
        {renderIcon(routeName, selectedTab)}
        <AppText
          style={[
            styles.txt,
            { color: selectedTab === routeName ? themeColors.primary : themeColors.textTertiary }
          ]}
        >
          {tab?.name ?? routeName}
        </AppText>
      </TouchableOpacity>
    );
  };
  /* ==== Nút tròn ở giữa ==== */
  const renderCircle = () => (
    <Animated.View style={styles.fab}>
      <LinearGradient
        colors={["#4ABAB9", themeColors.primary]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <TouchableOpacity style={styles.buttonCenter} activeOpacity={0.7}>
        <HomeIcon />
      </TouchableOpacity>
    </Animated.View>
  );
  return (
    <>
      <CurvedBottomBar.Navigator
        ref={tabRef}
        type="DOWN"
        circlePosition="CENTER"
        initialRouteName="home"
        bgColor="#fff"
        height={Spacing.height70}
        width={undefined}
        borderColor="#eee"
        borderWidth={0}
        id="mainTab"
        circleWidth={56}
        borderTopLeftRight={false}
        shadowStyle={styles.shadow}
        renderCircle={renderCircle}
        tabBar={renderTabBar}
        backBehavior="initialRoute"
        style={undefined}
        screenListeners={{}}
        screenOptions={{
          headerShown: false, // Ẩn header ở tất cả các tab
        }}
        defaultScreenOptions={{}}
      >
        {TABS.map(tab => (
          <CurvedBottomBar.Screen
            key={tab.key}
            name={tab.key} // dùng key thay vì name
            position={tab.position}
            component={tab.component}
          />
        ))}
      </CurvedBottomBar.Navigator>
      <PhoneCallFloatingButton />
    </>
  );
});


export { TabBarNavigation };
const styles = StyleSheet.create({
  screen: { flex: 1 },
  tabItem: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.width4, },
  fab: {
    width: Spacing.width60,
    height: Spacing.width60,
    borderRadius: Spacing.width60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: Spacing.height20,
    overflow: 'hidden',

  },
  shadow: {
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 }, elevation: 4,
  },
  txt: {
    fontSize: FontSize.FontSize12,
    color: '#000',
    ...FontWithFamily.FontWithFamily_400
  },
  buttonCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    // gap: Spacing.width4,
  }
});
