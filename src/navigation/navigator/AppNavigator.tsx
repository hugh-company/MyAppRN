import {
  AuthStackComponent,
  MainStackComponent,
  SCREEN_ROUTE,
} from '@navigation';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getTokenSelector} from '@redux';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();

const AppNavigator = React.forwardRef<NavigationContainerRef<{}>>(
  (props, ref) => {
    const token = useSelector(getTokenSelector);

    useEffect(() => {
      if (token) {
      }
    }, [token]);

    return (
      <NavigationContainer ref={ref}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {token ? (
            <Stack.Screen
              name={SCREEN_ROUTE.MAIN_STACK}
              component={MainStackComponent}
            />
          ) : (
            <Stack.Screen
              name={SCREEN_ROUTE.AUTH_STACK}
              component={AuthStackComponent}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  },
);

export {AppNavigator};
