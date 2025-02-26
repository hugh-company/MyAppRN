import { API_ENDPOINTS, ApiConfigs, apiService } from '@api';
import { genderInterface, responseDatingNearYou, TypeTabDatingApi } from '@types';

export interface UserFindInterface {
  // /finder/finds/?age=18-44&gender=female&location=11__98755__106__321124&distance=10
  age?: string;
  gender?: genderInterface;
  location?: {
    latitude: number;
    longitude: number;
  };
  distance?: number;
}
export const findUserApi = async (params: UserFindInterface) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const location = `${params.location?.latitude.toString().replace('.', '__')}__${params.location?.longitude.toString().replace('.', '__')}`;
  let newParams: any = {
    age: params.age,
    distance: params.distance,
    location,
  };
  if (params?.gender) {
    newParams = {
      ...newParams,
      gender: params.gender,
    };
  }

  return apiService.get(API_ENDPOINTS.FIND_DATING, newParams);
};
export const getDatingDashboardApi = async (type: TypeTabDatingApi, params?: any) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return apiService.get<responseDatingNearYou>(API_ENDPOINTS.DATING_HOME + type, params);
};
export const getDetailUserApi = async (id: number) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return apiService.get(API_ENDPOINTS.DETAIL_USER + id);
};
