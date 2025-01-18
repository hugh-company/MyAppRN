import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getUserInfo, isDashboardDatingSelector } from '@redux';
import { ComicScreen, DashboardCreateProfile, DatingScreen, GameScreen, HomeScreen, MovieScreen } from '@screens';
import React from 'react';
import { useSelector } from 'react-redux';
import { SCREEN_ROUTE } from '../router';
import { CustomTabBar } from './CustomTabBar';
const Tab = createBottomTabNavigator();
const TabBarNavigation = React.memo(() => {
  const userInfo = useSelector(getUserInfo);
  const isDashboardDating = useSelector(isDashboardDatingSelector);
  console.log({ userInfo });
  // const isUpdateProfile =
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
      {isDashboardDating ? <Tab.Screen name={SCREEN_ROUTE.DATING} component={DatingScreen} /> : <Tab.Screen name={SCREEN_ROUTE.DATING} component={DashboardCreateProfile} />}
      {/* <Tab.Screen name={SCREEN_ROUTE.DATING} component={DatingScreen} /> */}
    </Tab.Navigator>
  );
});
export { TabBarNavigation };
