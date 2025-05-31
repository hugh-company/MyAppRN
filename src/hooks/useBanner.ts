import {API_ENDPOINTS, KeyQueryApi} from '@api';
import {useApiQuery} from './useApiQuery';

export const useBannerData = () => {
  const {data, error, isLoading, isFetching, refetch} = useApiQuery<any>(
    KeyQueryApi.GET_BANNER,
    API_ENDPOINTS.GET_LIST_BANNER,
  );

  return {
    data: data?.data || [],
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
