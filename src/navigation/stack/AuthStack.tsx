import { SCREEN_ROUTE } from '@navigation';

import { createStackNavigator } from '@react-navigation/stack';
import {
  SelectVerify,
  SetupInfoUser,
  SignUp,
  SupportVerifyCode,
  VerifyCode,
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
        initialRouteName={SCREEN_ROUTE.SETUP_INFO_USER}>
        <AuthStack.Screen name={SCREEN_ROUTE.SETUP_INFO_USER} component={SetupInfoUser} />
        <AuthStack.Screen name={SCREEN_ROUTE.SIGN_UP} component={SignUp} />
        <AuthStack.Screen name={SCREEN_ROUTE.SELECT_VERIFY} component={SelectVerify} />
        <AuthStack.Screen name={SCREEN_ROUTE.SUPPORT_VERIFY_CODE} component={SupportVerifyCode} />
        <AuthStack.Screen name={SCREEN_ROUTE.VERIFY_CODE} component={VerifyCode} />

      </AuthStack.Navigator>
    </>
  );
});

export { AuthStackComponent };

