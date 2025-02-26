import { API_ENDPOINTS, ApiConfigs, apiService } from '@api';


interface paramsMessage {
  paged?: number;
  search?: string;
}

export const getListConversationApi = (params: paramsMessage) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return apiService.get(API_ENDPOINTS.CHAT, params);
};
