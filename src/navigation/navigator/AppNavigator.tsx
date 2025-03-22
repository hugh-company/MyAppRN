import { apiService } from '@api';
import {
  AuthStackComponent,
  MainStackComponent,
  SCREEN_ROUTE,
} from '@navigation';
import { handleNavigateNotification, initNotifications } from '@notifications';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import {
  DarkTheme,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getLocations, getToken, getUserInfo, setInfoUser, setIsDashboardDating, setUserInfo } from '@redux';
import { NotificationDetailScreen, NotificationScreen, PreviewImages } from '@screens';
import { getUserProfileApi } from '@services';
import React, { useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
const Stack = createStackNavigator();
const NAVIGATION_IDS = ['home', 'post', 'settings'];

function buildDeepLinkFromNotificationData(notification: any): string | null {
  console.log({ notification });
  setTimeout(() => {
    handleNavigateNotification(notification);
  }, 1000);
  return null;
}

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Home: 'home',
      Post: 'post/:id',
      Settings: 'settings',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    console.log({ deeplinkURL });

    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};
const AppNavigator = React.forwardRef<NavigationContainerRef<{}>>(
  (props, ref) => {
    const token = useSelector(getToken);
    const dispatch = useDispatch();
    const isConnectedRef = useRef(false);
    const userInfo = useSelector(getUserInfo);
    const location = useSelector(getLocations);

    const callApiProfile = async () => {
      try {
        const responseUser: any = await getUserProfileApi();
        console.log({ responseUser });

        dispatch(setUserInfo(responseUser?.data?.me));
      } catch (error) { }
    };
    useEffect(() => {
      if (userInfo) {
        const isShowDating =
          userInfo?.about_me && userInfo?.personal?.favorites && userInfo.personal.favorites.length > 0;

        dispatch(setIsDashboardDating(isShowDating));
      }
    }, [userInfo]);
    const connectSocket = async (tokenData: string) => {
      try {
        const device_id = await DeviceInfo.getUniqueId();
        dispatch(setInfoUser({ token: tokenData, device_id }));
      } catch (error) {
        console.log({ error });

      }
    };



    const onHandleCallInit = async () => {
      initNotifications();

      await apiService.reset();
      apiService.setToken(token);
      apiService.setTokenWithoutSaveLocal(token);

      callApiProfile();
    };
    // check network
    useEffect(() => {
      if (token) {
        onHandleCallInit();

        const unsubscribe = NetInfo.addEventListener((state) => {
          console.log('Connection type', state.type);

          if (state.isConnected && !isConnectedRef.current) {
            console.log('Internet connection');
            isConnectedRef.current = true;
            connectSocket(token); // Ensure reconnection for both platforms
          } else if (!state.isConnected) {
            isConnectedRef.current = false;
            console.log('No internet connection');
          } else if (state.isConnected && isConnectedRef.current) {
            console.log('Reconnected to the internet');
            connectSocket(token); // Ensure reconnection for both platforms
          }
        });

        return () => {
          unsubscribe();
        };
      }
    }, [token]);

    const { top, bottom } = useSafeAreaInsets();
    return (
      <>
        {/* <View style={{ position: 'absolute', top: top, left: 0, right: 0, zIndex: 9999 }}>
          <AppText>{`location:${location?.latitude} - ${location?.longitude}`}</AppText>
        </View> */}
        <NavigationContainer linking={linking} theme={DarkTheme} ref={ref}>
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

            <Stack.Screen name={SCREEN_ROUTE.NOTIFICATION} component={NotificationScreen} />
            <Stack.Screen name={SCREEN_ROUTE.NOTIFICATION_DETAIL} component={NotificationDetailScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  },
);

export { AppNavigator };
