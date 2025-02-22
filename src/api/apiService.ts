import NetInfo from '@react-native-community/netinfo'; // Import NetInfo
import {store} from '@redux';
import axios, {AxiosResponse, CancelTokenSource} from 'axios';
import i18next from 'i18next';
import {ApiConfigs} from './apiConfig';
import {handleResponse} from './responseHandler';

class AxiosClass {
  static instance: AxiosClass;

  static default() {
    if (!AxiosClass.instance) {
      AxiosClass.instance = new AxiosClass();
    }
    return AxiosClass.instance;
  }

  api: any;
  incrementRequestId = 0;
  token = '';
  storeKey = '';
  pendingRequests: any[] = []; // Store pending requests

  constructor() {
    this.api = axios.create({
      ...ApiConfigs,
      timeout: 30000, // Add timeout configuration
    });
    this.api.interceptors.response.use(
      this.interceptorResponses,
      (err: any) => {
        if (err.code === 'ECONNABORTED') {
          console.error('Request timeout');
        }
        return handleResponse(err);
      },
    );
    this.api.interceptors.request.use(this.interceptorRequests);

    this.listenToNetworkChanges(); // Add network change listener
  }

  interceptorRequests = async (config: any): Promise<any> => {
    const token = await store.getState().accountSlice.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  interceptorResponses = (response: AxiosResponse): Promise<any> => {
    const {data} = response;
    if (data?.status === 'error') {
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  };

  setToken = async (token: string) => {
    this.token = `Bearer ${token}`;
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  setTokenWithoutSaveLocal = async (token: string) => {
    this.token = token;
    this.api.defaults.headers.common.Authorization = token;
  };

  clear = () => {
    this.token = '';
    this.api.defaults.headers.common.Authorization = null;
  };
  getToken = () => this.token;
  setStoreKey = (key: string) => {
    this.storeKey = key;
  };

  setBaseURL = (baseURL?: string) => {
    const language = i18next.language;
    if (baseURL) {
      this.api.defaults.baseURL = baseURL.replace('{language}', language);
    } else {
      this.api.defaults.baseURL = ApiConfigs.baseURL.replace(
        '{language}',
        language,
      );
    }
  };

  get<T>(
    url: string,
    params?: any,
    headers?:
      | any
      | {
          cancelToken: CancelTokenSource;
        },
  ): Promise<T> {
    console.log('GET ------->>', url, this.api.defaults.headers);
    const newHeader: any = {
      headers: {
        ...this.api.defaults.headers,
        // ...headers,
      },
    };
    if (params?.paged && params?.paged > 1) {
      url = `${url}paged/${params.paged}`;
    }
    if (params?.sortby) {
      url = `${url}?sortby=${params.sortby}`;
    }
    if (params) {
      newHeader.params = {
        ...params,
      };
    }
    if (headers?.cancelToken) {
      newHeader.cancelToken = headers.cancelToken;
    }
    console.log(url, {
      ...newHeader,
    });

    return this.api
      .get(url, {
        ...newHeader,
      })
      .catch(this.handleRequestError);
  }

  del<T>(url: string): Promise<T> {
    console.log('DEL ------->>', url);

    return this.api
      .delete(url, {
        headers: {
          _id: this.incrementRequestId,
          ...this.api.defaults.headers,
        },
      })
      .catch(this.handleRequestError);
  }

  postNormal<T>(url: string, body?: any, header: any = {}): Promise<T> {
    console.log('POSTNORMAL ------->>', url, body, this.token, {
      headers: {
        ...header,
      },
    });
    return this.api
      .post(url, body, {
        headers: {
          ...header,
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Encoding': 'gzip, deflate, br',

          Accept: 'application/json',
          timeout: 60000,
        },
      })
      .catch(this.handleRequestError);
  }

  put<T>(url: string, body: any, header: any = {}): Promise<T> {
    return this.api
      .put(url, body, {
        headers: {
          // 'Content-Type': ' 'Content-Type': 'multipart/form-data'',
          ...header,
        },
      })
      .catch(this.handleRequestError);
  }

  delete<T>(url: string, body: any): Promise<T> {
    console.log('detlete NORMAL ------->>', url, body, this.token);
    return this.api
      .delete(url, {
        data: body,
        headers: {
          _id: this.incrementRequestId,
          lang: i18next.language.toLowerCase(),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .catch(this.handleRequestError);
  }
  post<T>(url: string, body: any): Promise<T> {
    console.log('POST ------->>', url, body, this.token);
    return this.api
      .post(url, body, {
        headers: {
          _id: this.incrementRequestId,
          lang: i18next.language.toLowerCase(),
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
      .catch(this.handleRequestError);
  }
  uploadFile<T>(url: string, body: FormData, header: any = {}): Promise<T> {
    let newBody = body ? {...body} : {};
    console.log('POSTNORMAL ------->>', url, newBody, this.token);
    return this.api
      .post(url, body, {
        headers: {
          lang: i18next.language.toLowerCase(),
          _id: this.incrementRequestId,
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'multipart/form-data',
          ...header,
        },
      })
      .catch(this.handleRequestError);
  }

  listenToNetworkChanges = () => {
    NetInfo.addEventListener(state => {
      if (state.isConnected) {
        console.log('Network reconnected');
        this.retryPendingRequests(); // Retry pending requests
      }
    });
  };

  retryPendingRequests = () => {
    this.pendingRequests.forEach(request => {
      this.api(request.config).then(request.resolve).catch(request.reject);
    });
    this.pendingRequests = [];
  };

  handleRequestError = (error: any) => {
    if (!error.response && error.message === 'Network Error') {
      return new Promise((resolve, reject) => {
        this.pendingRequests.push({config: error.config, resolve, reject});
      });
    }
    return Promise.reject(error);
  };
}

export const apiService = AxiosClass.default();
