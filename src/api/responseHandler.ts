import {NavigationUtils} from '@navigation';
import axios, {AxiosError} from 'axios';
import {Alert} from 'react-native';

import {logout, store} from '@redux';
import {ERROR_MESSAGES} from './apiConfig';

export const handleResponse = async (error: any) => {
  if (axios.isCancel(error)) {
    console.log(
      ERROR_MESSAGES.REQUEST_CANCELLED,
      (error as AxiosError).message,
    );
  } else if (axios.isAxiosError(error) && error.response) {
    if (error.response.status === 401) {
      // await handleTokenExpiration();
    }
  } else if (axios.isAxiosError(error) && error.request) {
    console.log('Request error:', error.request);
  } else {
    console.log('Error:', (error as Error).message);
  }
  console.log({error});

  return Promise.reject(error.response.data);
};

const handleTokenExpiration = async () => {
  try {
    store.dispatch(logout());

    Alert.alert(
      'Session Expired',
      'Your session has expired. Please log in again.',
      [
        {
          text: 'OK',
          onPress: () => {
            NavigationUtils.navigate('Login');
          },
        },
      ],
      {cancelable: false},
    );
  } catch (error) {
    console.error('Error handling token expiration:', error);
  }
};
