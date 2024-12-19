import { SCREEN_ROUTE } from '@navigation';

import { createStackNavigator } from '@react-navigation/stack';
import {
  ForgotScreen,
  LoginScreen,
  RegisterScreen,
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
        <AuthStack.Screen name={SCREEN_ROUTE.REGISTER} component={RegisterScreen} />
        <AuthStack.Screen name={SCREEN_ROUTE.FORGOT_PASSWORD} component={ForgotScreen} />

      </AuthStack.Navigator>
    </>
  );
});

export { AuthStackComponent };
