// src/api/apiClient.ts
import {store} from '@redux';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import i18next from 'i18next';
import {ApiConfigs} from './apiConfig';

// Tạo axios instance với baseURL
const apiClient = axios.create({
  ...ApiConfigs,
  timeout: 30000, // Add timeout configuration
});

// Interceptor: Gắn token vào header cho mọi request
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

// Optional: Interceptor cho response (xử lý lỗi chung)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => {
    // Xử lý lỗi chung (ví dụ: tự động logout nếu token hết hạn)
    return Promise.reject(error);
  },
);
// update base url mới
export const setBaseURLApi = (newBaseURL?: string) => {
  const language = i18next.language;
  console.log({newBaseURL});

  if (newBaseURL) {
    apiClient.defaults.baseURL = newBaseURL.replace('{language}', language);
  } else {
    apiClient.defaults.baseURL = ApiConfigs.baseURL.replace(
      '{language}',
      language,
    );
  }
};
// Các hàm helper cho các phương thức API
export const getRequestBaseUrlOther = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  console.log('getRequestBaseUrlOther', url);
  const language = i18next.language;
  apiClient.defaults.baseURL = `${ApiConfigs.baseURL}/home/index`.replace(
    '{language}',
    language,
  );
  const response = await apiClient.get<T>(url, config);
  apiClient.defaults.baseURL = ApiConfigs.baseURL.replace(
    '{language}',
    language,
  );
  return response.data;
};
export const getRequest = async <T>(
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const language = i18next.language;
  apiClient.defaults.baseURL = ApiConfigs.baseURL.replace(
    '{language}',
    language,
  );
  console.log('getRequest', url, apiClient.defaults.baseURL);
  if (params?.paged && params?.paged > 1) {
    url = `${url}paged/${params.paged}`;
  }
  if (params?.sortby) {
    url = `${url}?sortby=${params.sortby}`;
  }
  console.log({url}, params);

  const response = await apiClient.get<T>(url, {...config, params});
  return response.data;
};

export const postRequest = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};

export const putRequest = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
};

export const deleteRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
};

export const uploadRequest = async <T>(
  url: string,
  file: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const formData = new FormData();
  // Giả sử file có cấu trúc {uri, name, type}
  formData.append('file', file);

  const response = await apiClient.post<T>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers,
    },
    ...config,
  });
  return response.data;
};

export default apiClient;
