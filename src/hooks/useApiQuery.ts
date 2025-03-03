// src/hooks/useApiQuery.ts
import {getRequest, getRequestBaseUrlOther} from '@api';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import i18next from 'i18next';

export const useApiQuery = <T>(
  queryKey: string,
  url: string,
  params?: any,
  options?: UseQueryOptions<T>,
) => {
  const lang = i18next.language;
  return useQuery<T>({
    queryKey: [`${queryKey}_${lang}`],
    queryFn: () => getRequest<T>(url, params),
    ...options,
  });
};
export const useApiQueryHome = <T>(
  queryKey: string,
  url: string,
  options?: UseQueryOptions<T>,
) => {
  const lang = i18next.language;
  return useQuery<T>({
    queryKey: [`${queryKey}_${lang}`],

    queryFn: () => getRequestBaseUrlOther<T>(url),
    ...options,
  });
};
