import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChapterScreen, DatingScreen, GameScreen, HomeScreen, MovieScreen } from '@screens';
import React from 'react';
import { SCREEN_ROUTE } from '../router';
import { CustomTabBar } from './CustomTabBar';
const Tab = createBottomTabNavigator();
export const TabBarNavigation = () => {

  return (
    <Tab.Navigator screenOptions={
      {
        headerShown: false,
      }
    } tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name={SCREEN_ROUTE.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREEN_ROUTE.MOVIES} component={MovieScreen} />
      <Tab.Screen name={SCREEN_ROUTE.GAMES} component={GameScreen} />
      <Tab.Screen name={SCREEN_ROUTE.CHAPTERS} component={ChapterScreen} />
      <Tab.Screen name={SCREEN_ROUTE.DATING} component={DatingScreen} />
    </Tab.Navigator>
  );
};
