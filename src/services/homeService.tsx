import { ApiConfigs, apiService } from '@api';
import { responseHomeInterface } from '@types';


//
export interface responseDashboard {
  status?: string;
  message?: string;
  data?: responseHomeInterface
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

