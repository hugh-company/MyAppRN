import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {API_CONFIG, ERROR_MESSAGES, REQUEST_METHODS} from './apiConfig';
import {handleResponse} from './responseHandler';
import {store} from '@redux';

class ApiService {
  private axiosInstance: AxiosInstance;
  private cancelTokenSource: CancelTokenSource | null = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      async config => {
        // Log request
        console.log('🚀 REQUEST:', config.method?.toUpperCase());
        console.log('📦 REQUEST BODY:', config.data);

        // ... existing code ...
        // Kiểm tra kết nối internet
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
          return Promise.reject(new Error(ERROR_MESSAGES.NO_INTERNET));
        }

        // Thêm token vào header
        const token = await this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      error => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      response => {
        // Log response
        console.log('✅ RESPONSE:', response.status, response.config.url);
        console.log('📦 RESPONSE DATA:', response.data);
        return response;
      },
      error => {
        if (error.response) {
          console.log(
            '❌ ERROR RESPONSE:',
            error.response.status,
            error.config.url,
          );
          console.log('📦 ERROR DATA:', error.response.data);
        } else {
          console.log('❌ ERROR:', error.message);
        }
        handleResponse(error);
      },
    );
  }

  private async getToken() {
    const token = store.getState().user.token;
    return token;
  }
  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      if (this.cancelTokenSource) {
        this.cancelTokenSource.cancel(ERROR_MESSAGES.REQUEST_CANCELLED);
      }

      this.cancelTokenSource = axios.CancelToken.source();

      const response: AxiosResponse<T> = await this.axiosInstance.request({
        ...config,
        cancelToken: this.cancelTokenSource.token,
      });

      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(ERROR_MESSAGES.REQUEST_CANCELLED, error.message);
      }
      throw error;
    }
  }

  public cancelRequest() {
    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel(ERROR_MESSAGES.REQUEST_CANCELLED);
    }
  }

  public async get<T>(url: string, params?: any): Promise<T> {
    return this.request<T>({method: REQUEST_METHODS.GET, url, params});
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({method: REQUEST_METHODS.POST, url, data});
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({method: REQUEST_METHODS.PUT, url, data});
  }

  public async delete<T>(url: string): Promise<T> {
    return this.request<T>({method: REQUEST_METHODS.DELETE, url});
  }

  public async uploadFile<T>(
    url: string,
    file: File,
    onUploadProgress?: (progressEvent: any) => void,
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<T>({
      method: REQUEST_METHODS.POST,
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }
}

export const apiService = new ApiService();
