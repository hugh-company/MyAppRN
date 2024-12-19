import { setupCachePersister, setupGraphQlClient } from '@api';
import { ApolloProvider } from '@apollo/client';
import { GlobalUI, ModalChangeLanguage, ModalConfirmation } from '@components';
import { AppNavigator, NavigationUtils } from '@navigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { persistor, store } from '@redux';
import { ThemeProvider } from '@theme';
import { initI18n } from '@translations';

import React, { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Settings } from 'react-native-fbsdk-next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModalPortal } from 'react-native-modals';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
Settings.initializeSDK();
GoogleSignin.configure({
  scopes: ['email'],
  webClientId: Platform.OS === 'ios' ?
    '215589107688-hn52i6mnr89rfo4ov57bsqlibljo5iut.apps.googleusercontent.com' :
    '215589107688-hn52i6mnr89rfo4ov57bsqlibljo5iut.apps.googleusercontent.com',
});
// connect apollo client

initI18n();
const persistorCache = setupCachePersister();
const client = setupGraphQlClient();
const useGraphQLClient = () => {
  React.useEffect(() => {
    const loadCache = async () => {
      await persistorCache.restore();
    };

    loadCache();
  }, []);

  return client;
};
function App(): React.JSX.Element {
  const client = useGraphQLClient();

  useEffect(() => {
    // Hide splash screen once app is ready
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider >
        <Provider store={store}>
          <ApolloProvider client={client}>
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
              </SafeAreaProvider>
              <GlobalUI />
            </PersistGate>
          </ApolloProvider>
        </Provider>
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
