import { API_ENDPOINTS, ApiConfigs } from '@api';

import { apiService } from '@api';
import { UserInterface } from '@types';

// Định nghĩa các kiểu dữ liệu cho response
interface LoginResponse { status: string, data: { 'access_token': string, 'me': UserInterface }, message: string }
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
export const transformData = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};
export const loginApi = (data: paramsLogin) => {

  apiService.setBaseURL(ApiConfigs.baseURL);
  const formUrlEncoded = transformData(data);

  return apiService.postNormal<LoginResponse>(API_ENDPOINTS.LOGIN, formUrlEncoded, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });
};
export const csrfTokenApi = () => {
  return apiService.get(API_ENDPOINTS.CSRF_TOKEN);
};
export const registerApi = async ({ username, password, password_repeat, email, fullname }: paramsRegister) => {
  const responseToken: any = await csrfTokenApi();
  console.log({ responseToken });
  const data = {
    username,
    email,
    password,
    password_repeat,
    fullname,
    csrf_token: responseToken.data.csrf_token,
  };
  const form = transformData(data);

  return apiService.postNormal<LoginResponse>(API_ENDPOINTS.REGISTER, form,
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  );
};
