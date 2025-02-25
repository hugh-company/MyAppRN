import { ApiConfigs, apiService, KeyQueryApi, setBaseURLApi } from '@api';
import { useApiQuery, useApiQueryHome } from '@hooks';
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
// queryKey: [queryKey],

// export const useDashboardService
export const useDashboardHome = () => {
  return useApiQueryHome<responseDashboard>(
    KeyQueryApi.DASHBOARD_HOME,
    '',
  );
};

export const useMoviesDashboard = (
  params?: paramsGetListInterface,
) => {
  return useApiQuery<responseDashboard>(
    KeyQueryApi.DASHBOARD_MOVIES,
    '/home/movie/',
    params,
  );
};

export const useComicsDashboard = (params?: paramsGetListInterface,) => {
  setBaseURLApi(ApiConfigs.baseURL);
  return useApiQuery<responseDashboard>(
    KeyQueryApi.DASHBOARD_COMIC,
    '/home/comic',
    params
  );
};
export const useGamesDashboard = () => {
  setBaseURLApi(ApiConfigs.baseURL);
  return useApiQuery(
    KeyQueryApi.DASHBOARD_GAME,
    '/home/game',
  );
};

export const useSearchDashboard = () => {

  return useApiQuery<responseDashboard>(
    KeyQueryApi.DASHBOARD_SEARCH,
    '/home/search',
  );
};

