import { API_ENDPOINTS, ApiConfigs, apiService } from '@api';
import { transformData } from './loginService';

export const getUserProfileApi = () => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return apiService.get(API_ENDPOINTS.USER_PROFILE);
};
// update profile
export interface paramsUpdateProfile {
  phone: string;
  avatar: string;
  about_me: string;
  birthday: string;
  gender: string;
  fullname: string;

}
export const updateProfileApi = (params: paramsUpdateProfile) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const formUrlEncoded = transformData(params);
  return apiService.put(API_ENDPOINTS.UPDATE_PROFILE, formUrlEncoded, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });
};
