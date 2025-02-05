import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { isDashboardDatingSelector } from '@redux';
import { ComicScreen, DashboardCreateProfile, DatingScreen, GameScreen, HomeScreen, MovieScreen } from '@screens';

import React from 'react';
import { useSelector } from 'react-redux';
import { SCREEN_ROUTE } from '../router';
import { CustomTabBar } from './CustomTabBar';
const Tab = createBottomTabNavigator();
const TabBarNavigation = React.memo(() => {
  const isDashboardDating = useSelector(isDashboardDatingSelector);
  // const isUpdateProfile =
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        lazy: false, // Preload all screens
        // unmountOnBlur: true, // Unmount screens when they are not focused
      }}
      tabBar={CustomTabBarComponent}
    >
      <Tab.Screen name={SCREEN_ROUTE.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREEN_ROUTE.MOVIES} component={MovieScreen} />
      <Tab.Screen name={SCREEN_ROUTE.GAMES} component={GameScreen} />
      <Tab.Screen name={SCREEN_ROUTE.COMIC} component={ComicScreen} />
      {isDashboardDating ? <Tab.Screen name={SCREEN_ROUTE.DATING} component={DatingScreen} /> : <Tab.Screen name={SCREEN_ROUTE.DATING} component={DashboardCreateProfile} />}
    </Tab.Navigator>
  );
});


const CustomTabBarComponent = (props: BottomTabBarProps) => <CustomTabBar {...props} />;
export { TabBarNavigation };
