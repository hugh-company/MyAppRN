const END_POINT = {
  production: {
    BASE_URL: 'https://serverapiphu.com',
  },
  staging: {
    BASE_URL: 'https://oninapp.com',
  },
};
export const ACCESS_TOKEN = '';
export const API_URL = '';
const ENV_ENVIRONMENT = 'staging' as keyof typeof END_POINT;
export const ApiConfigs = {
  baseURL: `${END_POINT[ENV_ENVIRONMENT].BASE_URL}/{language}/api/v1`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    timeout: 30000,
  },
  timeout: 30000,
};
export const BASE_IMAGE_URL = END_POINT[ENV_ENVIRONMENT].BASE_URL;
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
  // auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  CSRF_TOKEN: '/auth/csrf_create/',
  // account
  USER_PROFILE: '/user/info/',
  UPDATE_PROFILE: '/user/info',
  // Thêm các endpoint khác ở đây
  // home
  HOME: '/home/index/',
  MOVIES: '/terms/lists/',
  DETAIL: '/posts/detail/',
  LIST: '/posts/lists/',
  // CATEGORY: '/posts/category/',
  CATEGORY: '/terms/lists/',
  //rating
  RATING: '/posts/action/rating/',
  // report
  REPORT: '/posts/report/',
  // like
  LIKE: '/posts/action/like/',
  // favorite
  LIST_FAVORITE: '/user/favorites',
  LIST_JOBS: '/user/jobs',
  FAVORITE: '/posts/action/favorites/',
  SAVED: '/posts/action/save/',
  // view
  VIEW: '/posts/action/views/',
  // search
  SEARCH: '/posts/search/',
  SEND_LOCATION: '/user/location',
  // dating
  FIND_DATING: '/dating/finds/',
  NEAR_YOU: '/dating/nearyou/',
  LIKE_DATING: '/dating/likeyou/',
  DATING_HOME: '/dating/',
};
