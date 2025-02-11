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

export const getDataDashboardApi = () => {
  apiService.setBaseURL(ApiConfigs.baseURL + '/home/index');
  return apiService.get<responseDashboard>('', { page: 1, limit: 20 }).finally(() => {
    apiService.setBaseURL();
  }
  );
};
export const getPostDashboardApi = (type: PostTypeKey | ItemListDashboard, params?: paramsGetListInterface,) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  console.log({ type, params });

  return apiService.get<responseDashboard>(`/home/${type}/`, params).finally(() => {
    apiService.setBaseURL();
  }
  );
};
