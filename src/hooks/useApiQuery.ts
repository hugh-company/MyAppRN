// src/hooks/useApiQuery.ts
import {getRequest, getRequestSystem} from '@api';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import i18next from 'i18next';

export const useApiQuery = <T>(
  queryKey: string,
  url: string,
  params?: any,
  options?: Omit<UseQueryOptions<T>, 'queryKey'>,
) => {
  const lang = i18next.language;
  return useQuery<T>({
    queryKey: [`${queryKey}_${lang}`],
    queryFn: () => getRequest<T>(url, params),
    ...options,
  });
};
export const useApiQuerySyStem = <T>(
  queryKey: string,
  url: string,
  options?: Omit<UseQueryOptions<T>, 'queryKey'>,
) => {
  return useQuery<T>({
    queryKey: [`${queryKey}`],

    queryFn: () => getRequestSystem<T>(url),
    ...options,
  });
};
