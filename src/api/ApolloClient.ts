import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {AsyncStorage, mmkvStorage, showNotificationError} from '@utils';
import {CachePersistor} from 'apollo3-cache-persist';
import {onError} from '@apollo/client/link/error';
import {clearToken, store} from '@redux';
const httpLink = new HttpLink({
  // uri: `${API_CONFIG.BASE_URL}/graphql`
  uri: 'http://localhost:8080/graphql',
});
const ERROR_MESSAGES = {
  UNAUTHORIZED: "The current Merchant isn't authorized",
  STORE_NOT_EXISTED: ['Store not existed', 'This store is not exist'],
  INVALID_VALUE: 'got invalid value (empty string); Int cannot',
  REQUIRED_STORE_ID: 'Variable "$storeId" of required type',
};
const apolloCache = new InMemoryCache();
export const setupCachePersister = (): CachePersistor<any> =>
  new CachePersistor({
    cache: apolloCache,
    storage: mmkvStorage,
    debug: false,
  });
const getToken = async () => {
  const token = await AsyncStorage.getString('token');
  return token;
};
const getStoreViewCode = async () => {
  const storeViewCode = await AsyncStorage.getString('store_view_code');
  return storeViewCode;
};
const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error: any) => {
      // console.log('error', error);
      if (error.message.includes(ERROR_MESSAGES.UNAUTHORIZED)) {
        console.log('error', error.message);
        showNotificationError('Logout', error.message);
        store.dispatch(clearToken());
      }
      // showNotificationError('Error', error.message);
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});
const authLink = setContext(async (_, {headers}) => {
  const token = await getToken();
  const storeViewCode = await getStoreViewCode();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      Store: storeViewCode ? storeViewCode : 'dream_hall',
      Accept: 'application/json',
    },
  };
});

export const setupGraphQlClient = (): ApolloClient<any> =>
  new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink),
    cache: apolloCache,
    queryDeduplication: false,
  });
