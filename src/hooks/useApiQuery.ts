// src/hooks/useApiQuery.ts
import {getRequest, getRequestBaseUrlOther} from '@api';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

export const useApiQuery = <T>(
  queryKey: string,
  url: string,
  params?: any,
  options?: UseQueryOptions<T>,
) => {
  return useQuery<T>({
    queryKey: [queryKey],
    queryFn: () => getRequest<T>(url, params),
    ...options,
  });
};
export const useApiQueryHome = <T>(
  queryKey: string,
  url: string,
  options?: UseQueryOptions<T>,
) => {
  return useQuery<T>({
    queryKey: [queryKey],
    queryFn: () => getRequestBaseUrlOther<T>(url),
    ...options,
  });
};
