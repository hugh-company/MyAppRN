import { SCREEN_ROUTE } from '@navigation';

import { createStackNavigator } from '@react-navigation/stack';
import { ListMovieScreen, MovieDetailScreen, SearchScreen, VideoScreen } from '@screens';
import React, { memo } from 'react';
import { DrawerNavigation } from '../navigator/DrawerNavigation';

const MainStack = createStackNavigator();

const MainStackComponent = memo(() => {
  return (
    <>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={SCREEN_ROUTE.DRAWER_NAVIGATION}>
        <MainStack.Screen name={SCREEN_ROUTE.DRAWER_NAVIGATION} component={DrawerNavigation} />

        {/* Search */}
        <MainStack.Screen name={SCREEN_ROUTE.SEARCH_SCREEN} component={SearchScreen} />
        {/* Movies */}
        <MainStack.Screen name={SCREEN_ROUTE.LIST_MOVIES} component={ListMovieScreen} />
        <MainStack.Screen name={SCREEN_ROUTE.MOVIE_DETAIL} component={MovieDetailScreen} />
        <MainStack.Screen name={SCREEN_ROUTE.VIDEO} component={VideoScreen} />
      </MainStack.Navigator>
    </>
  );
});

export { MainStackComponent };
