import { API_ENDPOINTS, ApiConfigs, postRequestSystem } from '@api';

import { apiService } from '@api';
import { UserInterface } from '@types';

// Định nghĩa các kiểu dữ liệu cho response
interface LoginResponse { status: string, data: { 'accessToken': string, 'user': UserInterface }, message: string }
interface paramsLogin {
  username: string;
  password: string;
}
interface paramsRegister {
  'username': string,
  'fullname': string,
  'email': string,
  'password': string,
  'password_repeat': string,
  'csrf_token'?: string
}
// API functions
export const loginApi = (data: paramsLogin) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return postRequestSystem<LoginResponse>(API_ENDPOINTS.LOGIN, data);
};


export const registerApi = async (params: any) => {
  return postRequestSystem<LoginResponse>(API_ENDPOINTS.REGISTER, params);
};

export const forgotPasswordApi = async (email: string) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return postRequestSystem(API_ENDPOINTS.FORGOT_PASSWORD, { email });
};
