import { setupCachePersister, setupGraphQlClient } from '@api';
import { ApolloProvider } from '@apollo/client';
import { AppNavigator, NavigationUtils } from '@navigation';
import { persistor, store } from '@redux';
import { ThemeProvider } from '@theme';
import { initI18n } from '@translations';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
    <ThemeProvider>
      <GestureHandlerRootView style={styles.container}>
        <Provider store={store}>
          <ApolloProvider client={client}>
            {/* <NetworkStatus /> */}
            <PersistGate loading={null} persistor={persistor}>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <AppNavigator
                  ref={(navigatorRef: any) => {
                    NavigationUtils.setTopLevelNavigator(navigatorRef);
                  }}
                />
              </SafeAreaProvider>
            </PersistGate>
          </ApolloProvider>
        </Provider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
