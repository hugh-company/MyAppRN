import { setupCachePersister, setupGraphQlClient } from '@api';
import { ApolloProvider } from '@apollo/client';
import { ModalConfirmation } from '@components';
import { AppNavigator, NavigationUtils } from '@navigation';
import { persistor, store } from '@redux';
import { ThemeProvider } from '@theme';
import { initI18n } from '@translations';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModalPortal } from 'react-native-modals';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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
      <ThemeProvider>
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
              </SafeAreaProvider>
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
