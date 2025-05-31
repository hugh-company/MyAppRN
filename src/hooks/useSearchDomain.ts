import {API_ENDPOINTS, KeyQueryApi} from '@api';
import {ParamsSearchDomain, SearchDomainResponse} from '@types';
import {useApiQuery} from './useApiQuery';

const normalizeDomainData = (data: any, useNameCom: boolean) => {
  if (!data) {
    return {
      domain: '',
      isAvailable: false,
      price: 0,
      renewalPrice: 0,
      sld: '',
      tld: '',
    };
  }

  if (useNameCom) {
    // Normalize Name.com data
    return {
      domain: data.domainName,
      isAvailable: data.purchasable,
      price: data.purchasePrice,
      renewalPrice: data.renewalPrice,
      sld: data.sld,
      tld: data.tld,
    };
  }

  // Default normalization for other APIs
  return {
    domain: data.domain,
    isAvailable: data.isAvailable,
    price: data.price,
    renewalPrice: data.renewalPrice,
    sld: data.sld,
    tld: data.tld,
  };
};

export const useSearchDomainApi = (
  params: ParamsSearchDomain,
  useNameCom: boolean = false,
) => {
  const baseDomain = params.domain.trim().toLowerCase();
  const enabled = baseDomain.length > 0; // only call API when base domain exists
  const apiEndpoint = useNameCom
    ? API_ENDPOINTS.SEARCH_DOMAIN_NAME_COM
    : API_ENDPOINTS.SEARCH_DOMAIN;

  const {data, error, isLoading, isFetching, refetch} =
    useApiQuery<SearchDomainResponse>(
      KeyQueryApi.GET_SEARCH_DOMAIN + (useNameCom ? '_name_com' : ''),
      apiEndpoint,
      {
        domain: baseDomain,
      },
      {enabled},
    );

  const normalizedData = data?.listPrefer?.domains?.map((item: any) =>
    normalizeDomainData(item, useNameCom),
  );

  return {
    baseDomain,
    domainDetail: normalizeDomainData(data?.isAvailable, useNameCom),
    list_ext: normalizedData,
    loading: isLoading || isFetching,
    error,
    refetch,
  };
};
