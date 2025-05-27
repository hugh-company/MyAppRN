import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getToken, getUserInfo } from '@redux';

import { HomeScreen } from '@screens';
import React from 'react';
import { useSelector } from 'react-redux';
import { SCREEN_ROUTE } from '../router';
import { CustomTabBar } from './CustomTabBar';
const Tab = createBottomTabNavigator();
const TabBarNavigation = React.memo(() => {
  const userInfo = useSelector(getUserInfo);
  const token = useSelector(getToken);
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

    </Tab.Navigator>
  );
});


const CustomTabBarComponent = (props: BottomTabBarProps) => <CustomTabBar {...props} />;
export { TabBarNavigation };
