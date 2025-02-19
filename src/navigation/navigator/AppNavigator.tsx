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
import { getToken, setInfoUser, setIsDashboardDating, setUserInfo } from '@redux';
import { PreviewImages } from '@screens';
import { getUserProfileApi } from '@services';
import { UserInterface } from '@types';
import React, { useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
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

        connectSocket(token);
      }
    }, [token]);
    const connectSocket = async (tokenData: string) => {
      try {
        const device_id = await DeviceInfo.getUniqueId();
        dispatch(setInfoUser({ token: tokenData, device_id }));
      } catch (error) {
        console.log({ error });

      }
    };

    return (
      <NavigationContainer theme={DarkTheme} ref={ref}>
        <Stack.Navigator screenOptions={{
          // detachPreviousScreen: true,
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
          <Stack.Screen
            name={SCREEN_ROUTE.IMAGE_MODAL}
            component={PreviewImages}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  },
);

export { AppNavigator };
