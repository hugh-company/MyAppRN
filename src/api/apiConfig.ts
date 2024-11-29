import Config from 'react-native-config';

const END_POINT = {
  production: {
    BASE_URL: Config.BASE_URL_PRODUCTION,
  },
  staging: {
    BASE_URL: Config.BASE_URL_STAGING,
  },
};

export const ACCESS_TOKEN = Config.ACCESS_TOKEN;
export const API_URL = Config.BASE_URL_STAGING;
const ENV_NAME = Config.ENV as keyof typeof END_POINT;
export const API_CONFIG = {
  BASE_URL: END_POINT[ENV_NAME].BASE_URL,
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
export const ERROR_MESSAGES = {
  NO_INTERNET: 'No internet connection',
  REQUEST_CANCELLED: 'Request was cancelled',
  UNEXPECTED_ERROR: 'An unexpected error occurred',
};

export const REQUEST_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const API_ENDPOINTS = {
  LOGIN: '/login',
  USER_PROFILE: '/users',
  // Thêm các endpoint khác ở đây
};
