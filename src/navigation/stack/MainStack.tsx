import { SCREEN_ROUTE } from '@navigation';

import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeScreen,
} from '@screens';
import React, { memo } from 'react';

const MainStack = createStackNavigator();

const MainStackComponent = memo(() => {
  return (
    <>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={SCREEN_ROUTE.HOME}>
        <MainStack.Screen name={SCREEN_ROUTE.HOME} component={HomeScreen} />
      </MainStack.Navigator>
 
    </>
  );
});

export { MainStackComponent };
