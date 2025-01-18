import { apiService } from '@api';
import {
  AuthStackComponent,
  MainStackComponent,
  SCREEN_ROUTE,
} from '@navigation';
import {
  DarkTheme,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getToken } from '@redux';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const AppNavigator = React.forwardRef<NavigationContainerRef<{}>>(
  (props, ref) => {
    const token = useSelector(getToken);
    console.log({ token });

    useEffect(() => {
      if (token) {
        apiService.setToken(token);
      }
    }, [token]);
    return (
      <NavigationContainer theme={DarkTheme} ref={ref}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name={SCREEN_ROUTE.MAIN_STACK}
            component={MainStackComponent}
          />
          {!token && <Stack.Screen
            name={SCREEN_ROUTE.AUTH_STACK}
            component={AuthStackComponent}
          />}
        </Stack.Navigator>
      </NavigationContainer>
    );
  },
);

export { AppNavigator };
