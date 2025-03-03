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
    timeout: 60000,
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
  timeout: 60000,
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
  LOGIN: '/auth/login/',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  CSRF_TOKEN: '/auth/csrf_create/',
  // account
  USER_PROFILE: '/users/info/',
  UPDATE_PROFILE: '/users/info',
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
  LIST_FAVORITE: '/users/favorites',
  LIST_JOBS: '/users/jobs',
  FAVORITE: '/posts/action/favorites/',
  SAVED: '/posts/action/save/',
  // view
  VIEW: '/posts/action/views/',
  // search
  SEARCH: '/posts/search/',
  SEND_LOCATION: '/users/location',
  // dating
  FIND_DATING: '/finder/finds/',
  NEAR_YOU: '/finder/nearyou/',
  LIKE_DATING: '/finder/likeyou/',
  DATING_HOME: '/finder/',

  DETAIL_USER: '/finder/detail/',
  // chat
  CHAT: '/chat/index/',
  CHAT_DETAIL: '/chat/detail/',
  // game trending
  GAME_TRENDING: '/posts/lists/game/',
  //
  SEARCH_MESSAGE: '/chat/search/',
  GET_IMAGE_CHAT: '/uploads/chats',
  //
  GET_STICKER: '/sticker/index',
};
// Key Query
export const KeyQueryApi = {
  DASHBOARD_HOME: 'dashboardHome',
  DASHBOARD_MOVIES: 'dashboardMovies',
  DASHBOARD_COMIC: 'dashboardComic',
  DASHBOARD_GAME: 'dashboardGame',
  DASHBOARD_DATING: 'dashboardDating',
  DASHBOARD_SEARCH: 'dashboardSearch',
  POST_DETAIL: 'postDetail',
  GET_LIST_POST: 'getListPost',
};
