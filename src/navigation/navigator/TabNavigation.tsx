import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ComicScreen, GameScreen, HomeScreen, ProfileScreen } from '@screens';

import React from 'react';
import { SCREEN_ROUTE } from '../router';
import { CustomTabBar } from './CustomTabBar';
const Tab = createBottomTabNavigator();
const TabBarNavigation = React.memo(() => {

  // const isUpdateProfile =
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // lazy: false, // Add this line to load all screens at once
      }}
      tabBar={CustomTabBarComponent}
    >
      <Tab.Screen name={SCREEN_ROUTE.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREEN_ROUTE.GAMES} component={GameScreen} />
      <Tab.Screen name={SCREEN_ROUTE.COMIC} component={ComicScreen} />
      <Tab.Screen name={SCREEN_ROUTE.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
});


const CustomTabBarComponent = (props: BottomTabBarProps) => <CustomTabBar {...props} />;
export { TabBarNavigation };
