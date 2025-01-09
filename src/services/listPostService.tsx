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
