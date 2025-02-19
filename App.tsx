import { apiService } from '@api';

import { persistor, store } from '@redux';
import { ThemeProvider } from '@theme';
import { initI18n } from '@translations';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { LogBox, StatusBar, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Orientation from 'react-native-orientation-locker';
// Removed Host import from 'react-native-portalize'
import { AppRatingMovie, GlobalService, GlobalUI, ModalChangeLanguage, ModalConfirmation } from '@components';
import { AppNavigator, NavigationUtils } from '@navigation';
import FlashMessage from 'react-native-flash-message';
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
    SplashScreen.hide();
    Orientation.lockToPortrait(); // Ensure it locks to portrait mode when the component unmounts
    apiService.setBaseURL();
  }, []);

  LogBox.ignoreLogs([
    /Support for defaultProps will be removed/,
    'Open debug',
  ]);
  return (
    <GestureHandlerRootView style={styles.containerApp}>
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
                    <FlashMessage position="top" />
                    <GlobalUI ref={GlobalService.globalUIRef} />

                  </View>

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
