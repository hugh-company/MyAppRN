// src/api/apiClient.ts
import {store} from '@redux';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ApiConfigs, ApiConfigsSystem} from './apiConfig';

// apiClient for https://api.gofiber.vn/api
const apiClient = axios.create({
  ...ApiConfigs, // Use ApiConfigsSystem for apiClient
  timeout: 30000,
});

// apiClientSystem for https://system.gofiber.vn/api/v1
const apiClientSystem = axios.create({
  ...ApiConfigsSystem, // Use ApiConfigsBanner for apiClientSystem
  timeout: 30000,
});

// Interceptor for apiClient
apiClient.interceptors.request.use(
  async (config: axios.InternalAxiosRequestConfig) => {
    const token = await store.getState().accountSlice.token;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Interceptor for apiClientSystem
apiClientSystem.interceptors.request.use(
  async (config: axios.InternalAxiosRequestConfig) => {
    const token = await store.getState().accountSlice.token;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Optional: Interceptor for response (shared logic)
const responseInterceptor = (response: AxiosResponse) => response;
const errorInterceptor = (error: any) => Promise.reject(error);

apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);
apiClientSystem.interceptors.response.use(
  responseInterceptor,
  errorInterceptor,
);

export const getRequestSystem = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  console.log('getRequestSystem', url, config);
  const response = await apiClientSystem.get<T>(url, config);
  return response.data;
};

export const postRequestSystem = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClientSystem.post<T>(url, data, config);
  return response.data;
};

// Function to get request with apiClient
export const getRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.get<T>(url, config);
  return response.data;
};
// Function to post request with apiClient
export const postRequest = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};
// Function to put request with apiClient
export const putRequest = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
};
// Function to delete request with apiClient
export const deleteRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
};

export default apiClient;
export {apiClientSystem};
