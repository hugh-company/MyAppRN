import { apiService } from '@api';

import { AppRatingMovie, GlobalService, GlobalUI, ModalChangeLanguage, ModalConfirmation } from '@components';
import { AppNavigator, NavigationUtils } from '@navigation';
import { persistor, store } from '@redux';
import { ThemeProvider } from '@theme';
import { initI18n } from '@translations';
import FlashMessage from 'react-native-flash-message';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { LogBox, Platform, StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { ModalPortal } from 'react-native-modals';
import Orientation from 'react-native-orientation-locker';
// Removed Host import from 'react-native-portalize'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

enableScreens();
enableFreeze(true);
// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
// Settings.initializeSDK();
// GoogleSignin.configure({
//   scopes: ['email'],
//   webClientId: Platform.OS === 'ios' ?
//     '215589107688-hn52i6mnr89rfo4ov57bsqlibljo5iut.apps.googleusercontent.com' :
//     '215589107688-hn52i6mnr89rfo4ov57bsqlibljo5iut.apps.googleusercontent.com',
// });
// connect apollo client

initI18n();
function App(): React.JSX.Element {
  const queryClient = new QueryClient();

  useEffect(() => {
    // Hide splash screen once app is ready
    StatusBar.setHidden(true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }

    SplashScreen.hide();
    Orientation.lockToPortrait(); // Ensure it locks to portrait mode when the component unmounts
    apiService.setBaseURL();
  }, []);

  LogBox.ignoreLogs([
    /Support for defaultProps will be removed/,
    'Open debug',
  ]);
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider >
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <StatusBar translucent backgroundColor="transparent" hidden={true} />
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                  <AppNavigator
                    ref={(navigatorRef: any) => {
                      NavigationUtils.setTopLevelNavigator(navigatorRef);
                    }}
                  />
                  <ModalPortal />
                  <ModalConfirmation />
                  <ModalChangeLanguage />
                  <AppRatingMovie />
                  <FlashMessage position="top" />
                  <GlobalUI ref={GlobalService.globalUIRef} />
                </SafeAreaProvider>
              </PersistGate>
            </Provider>
          </QueryClientProvider>
        </KeyboardProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

export default App;
