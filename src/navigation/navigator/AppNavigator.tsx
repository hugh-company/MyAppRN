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
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getLocations, getToken, getUserInfo, RootState } from '@redux';
import React, { useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import OnboardingScreen from '../../screens/onboarding/OnboardingScreen';
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
const AppNavigator = React.forwardRef(
  (props, ref) => {
    const token = useSelector(getToken);
    const dispatch = useDispatch();
    const isConnectedRef = useRef(false);
    const userInfo = useSelector(getUserInfo);
    const location = useSelector(getLocations);
    const hasSeenOnboarding = useSelector(
      (state: RootState) => state.settingSlice.hasSeenOnboarding,
    );
    const callApiProfile = async () => {
      try {
        // const responseUser: any = await getUserProfileApi();
        // console.log({ responseUser });

        // dispatch(setUserInfo(responseUser?.data?.me));
      } catch (error) { }
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
          } else if (!state.isConnected) {
            isConnectedRef.current = false;
            console.log('No internet connection');
          } else if (state.isConnected && isConnectedRef.current) {
            console.log('Reconnected to the internet');
          }
        });

        return () => {
          unsubscribe();
        };
      }
    }, [token]);

    console.log({ token });

    return (

      <NavigationContainer linking={linking} theme={DarkTheme} ref={ref}>
        <Stack.Navigator screenOptions={{
          freezeOnBlur: true,
          animation: 'fade',
          headerShown: false,

        }}>
          {!hasSeenOnboarding ? (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          ) : (
            <>
              <Stack.Screen
                name={SCREEN_ROUTE.MAIN_STACK}
                component={MainStackComponent}
              />
              {!token && <Stack.Screen
                name={SCREEN_ROUTE.AUTH_STACK}
                component={AuthStackComponent}
              />}
            </>
          )}

        </Stack.Navigator>
      </NavigationContainer>
    );
  },
);

export { AppNavigator };
