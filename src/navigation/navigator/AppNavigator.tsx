import {
  AuthStackComponent,
  MainStackComponent,
  SCREEN_ROUTE,
} from '@navigation';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

const AppNavigator = React.forwardRef<NavigationContainerRef<{}>>(
  (props, ref) => {

    return (
      <NavigationContainer ref={ref}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name={SCREEN_ROUTE.MAIN_STACK}
            component={MainStackComponent}
          />
          <Stack.Screen
            name={SCREEN_ROUTE.AUTH_STACK}
            component={AuthStackComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  },
);

export { AppNavigator };
