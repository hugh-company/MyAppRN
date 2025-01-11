import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ComicScreen, DashboardCreateProfile, GameScreen, HomeScreen, MovieScreen } from '@screens';
import React from 'react';
import { SCREEN_ROUTE } from '../router';
import { CustomTabBar } from './CustomTabBar';
const Tab = createBottomTabNavigator();
const TabBarNavigation = React.memo(() => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
      detachInactiveScreens={true} // Added prop
    >
      <Tab.Screen name={SCREEN_ROUTE.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREEN_ROUTE.MOVIES} component={MovieScreen} />
      <Tab.Screen name={SCREEN_ROUTE.GAMES} component={GameScreen} />
      <Tab.Screen name={SCREEN_ROUTE.COMIC} component={ComicScreen} />
      <Tab.Screen name={SCREEN_ROUTE.DATING} component={DashboardCreateProfile} />
    </Tab.Navigator>
  );
});
export { TabBarNavigation };
