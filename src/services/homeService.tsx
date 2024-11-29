import {API_ENDPOINTS, apiService} from '@api';
interface UserProfile {
  id: string;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}
export const getUserProfile = () => {
  return apiService.get<UserProfile>(`${API_ENDPOINTS.USER_PROFILE}`);
};
