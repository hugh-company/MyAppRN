import { ApiConfigs, apiService } from '@api';
import { ItemListDashboard, PostTypeKey, ResponseDataDashboard } from '@types';

interface responseDashboard {
  status?: string;
  message?: string;
  data?: ResponseDataDashboard;
}
interface paramsGetListInterface {
  filter?: string
}
export const getPostDashboardApi = (type: PostTypeKey | ItemListDashboard, params?: paramsGetListInterface,) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return apiService.get<responseDashboard>(`/home/${type}/`, params).finally(() => {
    apiService.setBaseURL();
  }
  );
};
