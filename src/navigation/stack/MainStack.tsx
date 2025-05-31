import { SCREEN_ROUTE } from '@navigation';

import { createStackNavigator } from '@react-navigation/stack';

import { CartScreen, DetailScreen, NewsScreen, SearchDomain } from '@screens';
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


        {/*  */}
        <MainStack.Screen name={SCREEN_ROUTE.DETAIL} component={DetailScreen} />
        <MainStack.Screen name={SCREEN_ROUTE.NEWS} component={NewsScreen} />
        <MainStack.Screen name={SCREEN_ROUTE.SEARCH_DOMAIN} component={SearchDomain} />
        <MainStack.Screen name={SCREEN_ROUTE.CART} component={CartScreen} />
      </MainStack.Navigator>

    </>
  );
});

export { MainStackComponent };
