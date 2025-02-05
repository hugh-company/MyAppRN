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
import { getToken, setIsDashboardDating, setUserInfo } from '@redux';
import { getUserProfileApi } from '@services';
import { UserInterface } from '@types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Stack = createStackNavigator();

const AppNavigator = React.forwardRef<NavigationContainerRef<{}>>(
  (props, ref) => {
    const token = useSelector(getToken);
    const dispatch = useDispatch();
    const callApiProfile = async () => {
      try {
        const responseUser: any = await getUserProfileApi();
        console.log({ responseUser });
        const userInfo = responseUser?.data?.me as UserInterface;
        const isShowDating =
          userInfo?.about_me && userInfo?.personal?.favorites && userInfo.personal.favorites.length > 0;

        dispatch(setIsDashboardDating(isShowDating));
        dispatch(setUserInfo(responseUser?.data?.me));
      } catch (error) { }
    };
    useEffect(() => {
      if (token) {
        callApiProfile();
        apiService.setToken(token);
      }
    }, [token]);

    return (
      <NavigationContainer theme={DarkTheme} ref={ref}>
        <Stack.Navigator screenOptions={{
          detachPreviousScreen: true,
          freezeOnBlur: true,
          animation: 'fade', // Giảm độ phức tạp của animation
          headerShown: false,

        }}>
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
