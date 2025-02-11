import { API_ENDPOINTS, ApiConfigs, apiService } from '@api';
import { PostTypeKey } from '@types';

interface paramsPost {
  paged?: number;

  sortby: string

}


export const getListPostApi = async (url: string, params: paramsPost, category?: string) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  let uri = `${url}`;
  if (category) {
    uri = `${url}${category}/`;
  }
  return apiService.get(uri, params);

};
// get category
export const getCategoryApi = async (type: PostTypeKey) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const uri = `${API_ENDPOINTS.CATEGORY}${type}/categories`;
  return apiService.get(uri);
};

// get favorite
interface paramFavorite {
  paged?: number;
  sortby?: string;
}
export const getFavoriteApi = async (type: PostTypeKey, param: paramFavorite) => {
  apiService.setBaseURL(ApiConfigs.baseURL);

  const uri = `${API_ENDPOINTS.LIST}${type}/favorites/`;
  return apiService.get(uri, param);
};

export const getSavedApi = async (type: PostTypeKey, param: paramFavorite) => {
  apiService.setBaseURL(ApiConfigs.baseURL);

  const uri = `${API_ENDPOINTS.LIST}${type}/save/`;
  return apiService.get(uri, param);
};

export const getListGamesTrendingApi = async () => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const uri = `${API_ENDPOINTS.GAME_TRENDING}`;
  return apiService.get(uri, {
    // ?sortby=views_day__DESC
    sortby: 'views_day__DESC',
  });
};
