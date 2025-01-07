import { API_ENDPOINTS, apiService } from '@api';
import { KeyHomeData } from '@types';
interface paramSearchInterface {
  s: string;
  sort: 'like_count' | 'views' | 'release_date';
}
export const searchApi = async (params: paramSearchInterface, type: KeyHomeData) => {

  const uri = `${API_ENDPOINTS.SEARCH}${type}`;
  return apiService.get(uri, params);

};
