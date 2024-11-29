import axios, {AxiosError} from 'axios';
import {Alert} from 'react-native';

import {ERROR_MESSAGES} from './apiConfig';
import {clearToken, store} from '@redux';

export const handleResponse = async (error: unknown) => {
  if (axios.isCancel(error)) {
    console.log(
      ERROR_MESSAGES.REQUEST_CANCELLED,
      (error as AxiosError).message,
    );
  } else if (axios.isAxiosError(error) && error.response) {
    if (error.response.status === 401) {
      await handleTokenExpiration();
    }
    console.log('Response error:', error.response.data);
  } else if (axios.isAxiosError(error) && error.request) {
    console.log('Request error:', error.request);
  } else {
    console.log('Error:', (error as Error).message);
  }
  return Promise.reject(error);
};

const handleTokenExpiration = async () => {
  try {
    store.dispatch(clearToken());

    Alert.alert(
      'Session Expired',
      'Your session has expired. Please log in again.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to login screen
            // You might need to use a navigation service or pass a navigation prop
            // to handle this navigation
            // For example: navigationService.navigate('Login');
          },
        },
      ],
      {cancelable: false},
    );
  } catch (error) {
    console.error('Error handling token expiration:', error);
  }
};
