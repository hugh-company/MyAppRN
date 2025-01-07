import { API_ENDPOINTS, ApiConfigs, apiService } from '@api';
import { PostTypeKey } from '@types';

interface paramsPost {
  page?: number;
  limit?: number;

  // movie: cmovie , release_year , country , tags , actor , director , country
  // comic : ccomic ,creator
  // novel : cnovel , creator
  // game : cgame

}


export const getListPostApi = async (type: PostTypeKey, params?: paramsPost) => {
  apiService.setBaseURL(ApiConfigs.baseURL);

  const uri = `${API_ENDPOINTS.LIST}${type}`;
  return apiService.get(uri, params);

};
