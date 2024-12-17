import { SCREEN_ROUTE } from '@navigation';

import { createStackNavigator } from '@react-navigation/stack';
import {
  LoginScreen,
} from '@screens';
import React, { memo } from 'react';

const AuthStack = createStackNavigator();

const AuthStackComponent = memo(() => {
  return (
    <>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={SCREEN_ROUTE.LOGIN}>
        <AuthStack.Screen name={SCREEN_ROUTE.LOGIN} component={LoginScreen} />
      </AuthStack.Navigator>
    </>
  );
});

export { AuthStackComponent };
