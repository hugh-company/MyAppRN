import {API_ENDPOINTS, ApiConfigs, apiService} from '@api';
import {ItemListProduct} from '@types';
export interface paramsGetListInterface {
  page?: number;
  limit?: number;
  post_type: 'movie' | 'game' | 'comic' | 'novel';
  term_type:
    | 'cmovie'
    | 'genres'
    | 'release_year'
    | 'country'
    | 'actor'
    | 'writer'
    | 'tag';
}
export interface responseGetListMovieInterface {}
export interface responseGetListInterface {
  status: string;
  data: ItemListProduct[];
  message: string;
}
export const getMoviesApi = (params: paramsGetListInterface) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const uri = `${API_ENDPOINTS.MOVIES}${params.post_type}/${params.term_type}`;
  return apiService.postNormal<responseGetListInterface>(
    uri,
    //  {page: params.page, limit: params.limit}
  );
};

export const getCategoryMoviesApi = (params: paramsGetListInterface) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const uri = `${API_ENDPOINTS.MOVIES}${params.post_type}/${params.term_type}`;
  return apiService.postNormal<responseGetListInterface>(
    uri,
    //  {page: params.page, limit: params.limit}
  );
};
export const getListMovie = () => {};
export const getDetailMovieApi = (id: number) => {
  const uri = `${API_ENDPOINTS.DETAIL}movie/${id}`;
  return apiService.get(uri);
};
