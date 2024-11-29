import {API_ENDPOINTS} from '@api';

import {apiService} from '@api';

// Định nghĩa các kiểu dữ liệu cho response
interface LoginResponse {
  token: string;
}

// API functions
export const loginApi = (email: string, password: string) => {
  return apiService.post<LoginResponse>(API_ENDPOINTS.LOGIN, {email, password});
};

// Thêm các API function khác ở đây...
