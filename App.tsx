import {setupCachePersister, setupGraphQlClient} from '@api';
import {ApolloProvider} from '@apollo/client';
import {NetworkStatus} from '@components';
import {AppNavigator, NavigationUtils} from '@navigation';
import {persistor, store} from '@redux';
import {initI18n} from '@translations';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
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
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        {/* <GlobalUIProvider ref={GlobalService.globalUIRef}> */}
        <ApolloProvider client={client}>
          <NetworkStatus />
          {/* <ThemeProvider> */}
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              {/* <NotifierWrapper> */}
              <AppNavigator
                ref={(navigatorRef: any) => {
                  NavigationUtils.setTopLevelNavigator(navigatorRef);
                }}
              />
              {/* </NotifierWrapper> */}
            </SafeAreaProvider>
          </PersistGate>
          {/* </ThemeProvider> */}
        </ApolloProvider>
        {/* </GlobalUIProvider> */}
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
