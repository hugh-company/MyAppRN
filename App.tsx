import { apiService } from '@api';

import { Spacing, ThemeProvider } from '@theme';
import { initI18n } from '@translations';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { LogBox, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Orientation from 'react-native-orientation-locker';
// Removed Host import from 'react-native-portalize'
import { AppRatingMovie, GlobalService, GlobalUI, ModalChangeLanguage, ModalConfirmation } from '@components';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { AppNavigator, NavigationUtils } from '@navigation';
import { initNotifications } from '@notifications';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings } from 'react-native-fbsdk-next';
import FlashMessage from 'react-native-flash-message';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';

enableScreens();
enableFreeze(true);
Settings.initializeSDK();
GoogleSignin.configure({
  webClientId: Platform.OS === 'android' ? '862326056116-v7qqpe1flnrpn85lrsvrm33k4hn5v0ju.apps.googleusercontent.com' : '862326056116-v7qqpe1flnrpn85lrsvrm33k4hn5v0ju.apps.googleusercontent.com',
  offlineAccess: true, // added to help resolve DEVELOPER_ERROR
});
initI18n();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Dữ liệu được coi là fresh trong 5 phút, sau đó sẽ dùng dữ liệu cache (stale)
      staleTime: 5 * 60 * 1000,
      // Cache sẽ được giữ trong 30 phút (nếu không có hoạt động)
      // cacheTime: 30 * 60 * 1000,
      // Không tự động refetch khi chuyển sang background (tuỳ chỉnh theo nhu cầu)
      refetchOnWindowFocus: false,
    },
  },
});

function App(): React.JSX.Element {


  useEffect(() => {
    SplashScreen.hide();
    Orientation.lockToPortrait(); // Ensure it locks to portrait mode when the component unmounts
    apiService.setBaseURL();
    // getAllApiStartApp(); // Prefetch all dashboard data

    // Request notification permissions and get the token
    initNotifications();


  }, []);

  LogBox.ignoreLogs([
    /Support for defaultProps will be removed/,
    'Open debug',
  ]);

  return (
    <GestureHandlerRootView style={styles.containerApp}>
      <BottomSheetModalProvider>
        <ThemeProvider >
          <KeyboardProvider>
            <QueryClientProvider client={queryClient}>

              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                    <View style={styles.container} >
                      <StatusBar translucent backgroundColor="transparent" />
                      <AppNavigator

                        ref={(navigatorRef: any) => {
                          NavigationUtils.setTopLevelNavigator(navigatorRef);
                        }}
                      />

                      <ModalConfirmation />
                      <ModalChangeLanguage />
                      <AppRatingMovie />
                      <FlashMessage position="top" style={{ paddingTop: Spacing.width24 }} />
                      <GlobalUI ref={GlobalService.globalUIRef} />

                    </View>

                  </SafeAreaProvider>
                </PersistGate>
              </Provider>
            </QueryClientProvider>
          </KeyboardProvider>
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  containerApp: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',

  },
});

export default App;
