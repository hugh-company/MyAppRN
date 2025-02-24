import {
  AuthStackComponent,
  MainStackComponent,
  SCREEN_ROUTE,
} from '@navigation';
import NetInfo from '@react-native-community/netinfo';
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
import React, { useEffect, useRef } from 'react';
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
const Stack = createStackNavigator();

const AppNavigator = React.forwardRef<NavigationContainerRef<{}>>(
  (props, ref) => {
    const token = useSelector(getToken);
    const dispatch = useDispatch();
    const isConnectedRef = useRef(false);
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
    // useEffect(() => {
    //   if (token) {
    //     callApiProfile();
    //     apiService.setToken(token);
    //     connectSocket(token);
    //   }
    // }, [token]);
    const connectSocket = async (tokenData: string) => {
      try {
        const device_id = await DeviceInfo.getUniqueId();
        dispatch(setInfoUser({ token: tokenData, device_id }));
      } catch (error) {
        console.log({ error });

      }
    };
    // check network
    useEffect(() => {
      if (token) {
        callApiProfile();
        connectSocket(token);
        const unsubscribe = NetInfo.addEventListener((state) => {
          if (state.isConnected && !isConnectedRef.current) {
            console.log('Internet connection');
            isConnectedRef.current = true;

          } else if (!state.isConnected) {
            isConnectedRef.current = false;
            console.log('No internet connection');
          } else if (state.isConnected && isConnectedRef.current) {
            console.log('Reconnected to the internet');
            dispatch({ type: 'RECONNECT_SOCKET' });
          }
        });

        return () => {
          unsubscribe();
        };
      }
    }, [token]);

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
