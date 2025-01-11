import { ApiConfigs, apiService } from '@api';
import { ResponseDataDashboard } from '@types';


//
export interface responseDashboard {
  status?: string;
  message?: string;
  data?: ResponseDataDashboard
}
//

export const getDataDashboardApi = () => {
  apiService.setBaseURL(ApiConfigs.baseURL + '/home/index');
  return apiService.get<responseDashboard>('', { page: 1, limit: 20 }).finally(() => {
    apiService.setBaseURL();
  }
  );
};

export const getListMovies = async () => {

};

