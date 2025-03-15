import { API_ENDPOINTS, ApiConfigs } from '@api';

import { apiService } from '@api';
import { UserInterface } from '@types';

// Định nghĩa các kiểu dữ liệu cho response
interface LoginResponse { status: string, data: { 'access_token': string, 'me': UserInterface }, message: string }
interface paramsLogin {
  username: string;
  password: string;
}

export interface UserLoginGoogleInterface {
  idToken: string;
  user: {
    photo: string;
    givenName: string;
    familyName: string;
    email: string;
    name: string;
    id: string;
  }
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
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);

  return apiService.postNormal<LoginResponse>(API_ENDPOINTS.LOGIN, formData, {
    'Content-Type': 'multipart/form-data',

  });
};

export const loginGoogleApi = (data: UserLoginGoogleInterface) => {

  apiService.setBaseURL(ApiConfigs.baseURL);
  const formData = new FormData();
  formData.append('idToken', data.idToken);
  formData.append('user', JSON.stringify(data.user));

  return apiService.postNormal<LoginResponse>(API_ENDPOINTS.LOGIN_GOOGLE, formData, {
    'Content-Type': 'multipart/form-data',
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
  const form = new FormData();
  form.append('username', data.username);
  form.append('email', data.email);
  form.append('password', data.password);
  form.append('password_repeat', data.password_repeat);
  form.append('fullname', data.fullname);
  form.append('csrf_token', data.csrf_token);


  return apiService.postNormal<LoginResponse>(API_ENDPOINTS.REGISTER, form,
    {
      // 'Content-Type': ' 'Content-Type': 'multipart/form-data'',
      'Content-Type': 'multipart/form-data',
    }
  );
};
