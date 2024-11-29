import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_ROUTE} from '../router';

const AuthStack = createStackNavigator();

const AuthStackComponent = memo(() => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SCREEN_ROUTE.AUTH_STACK}>
      <AuthStack.Screen name={SCREEN_ROUTE.SIGN_IN} component={LoginScreen} />
    </AuthStack.Navigator>
  );
});

export {AuthStackComponent};
