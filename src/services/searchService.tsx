import { API_ENDPOINTS, ApiConfigs, apiService } from '@api';
import { ItemListProduct } from '@types';
export interface paramSearchInterface {
  paged?: number;
  q?: string;
  sortby?: 'views__desc' | 'likes__desc' | '';
  filter?: 'posttype__movie' | 'posttype__game' | 'posttype__comic' | 'posttype__novel' | '' | undefined;
}
interface responseSearch {
  status?: string;
  message?: string;
  data?: {
    data: ItemListProduct[]
  }
}
export const searchApi = async (params: paramSearchInterface) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const uri = `${API_ENDPOINTS.SEARCH}`;
  return apiService.get<responseSearch>(uri, params);

};
//
export const searchMessageApi = async (params: paramSearchInterface) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const uri = `${API_ENDPOINTS.SEARCH_MESSAGE}`;
  return apiService.get<responseSearch>(uri, params);
};
