import { API_ENDPOINTS, ApiConfigs, apiService } from '@api';

interface stickerParams {
  paged?: number;

}
export const getStickerApi = (params?: stickerParams) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return apiService.get(API_ENDPOINTS.GET_STICKER, params);
};
