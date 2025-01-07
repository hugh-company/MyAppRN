import { API_ENDPOINTS, ApiConfigs, apiService } from '@api';
import { KeyTypeWithCategory, PostTypeKey } from '@types';
import { csrfTokenApi, transformData } from './loginService';

export const getDetailPostApi = (type: PostTypeKey, id: number) => {
  const uri = `${API_ENDPOINTS.DETAIL}${type}/${id}`;
  return apiService.get(uri);
};
// view list with type
export const getDetailListPostApi = (type: PostTypeKey, typeCategory: KeyTypeWithCategory) => {
  const uri = `${API_ENDPOINTS.LIST}${type}/${typeCategory}`;
  return apiService.get(uri);
};

// rating
interface ratingInterface {
  rating?: number;
  content?: string;
}
export const ratingPostApi = (id: number, type: PostTypeKey, params: ratingInterface,) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const uri = `${API_ENDPOINTS.RATING}${type}/${id}/`;
  const formUrlEncoded = transformData(params);
  return apiService.postNormal(uri, formUrlEncoded, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });
};

// like

interface paramLikeMovie {
  like: 1 | 2;
  // 1: like, 2: dislike
}
export const likePostApi = async (
  id: number,
  type: PostTypeKey,
  params: paramLikeMovie,
) => {
  const responseToken: any = await csrfTokenApi();
  apiService.setBaseURL(ApiConfigs.baseURL);
  const formUrlEncoded = transformData({
    ...params,
    csrf_token: responseToken.data.csrf_token,
  });
  return apiService.postNormal(
    `${API_ENDPOINTS.LIKE}${type}/${id}`,
    formUrlEncoded,
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  );
};

// favorite
export interface paramFavoriteMovie {
  posttype: PostTypeKey;
  post_id: number;
}
export const favoriteMovieApi = async (params: paramFavoriteMovie) => {
  const responseToken: any = await csrfTokenApi();
  apiService.setBaseURL(ApiConfigs.baseURL);
  const formUrlEncoded = transformData({
    ...params,
    csrf_token: responseToken.data.csrf_token,
  });
  return apiService.postNormal(API_ENDPOINTS.FAVORITE, formUrlEncoded, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });
};
// views
export const viewsPostApi = async (id: number, type: PostTypeKey) => {
  const responseToken: any = await csrfTokenApi();
  apiService.setBaseURL(ApiConfigs.baseURL);
  const formUrlEncoded = transformData({
    csrf_token: responseToken.data.csrf_token,
  });
  return apiService.postNormal(
    `${API_ENDPOINTS.VIEW}${type}/${id}`,
    formUrlEncoded,
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  );
};
