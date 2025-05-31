import { API_ENDPOINTS, ApiConfigs, apiService, KeyQueryApi } from '@api';
import { useApiQuery } from '@hooks';
import { genderInterface, PostTypeKey } from '@types';
export const getUserProfileApi = () => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return apiService.get(API_ENDPOINTS.USER_PROFILE);
};

// update profile
export interface paramsUpdateProfile {
  fullname: string;
  phone: string;
  avatar: string;
  about_me: string;
  birthday: string;
  gender: genderInterface;
  rel_status?: string;
  galleries: string[];
  zalo?: string;
  facebook?: string;
  instagram?: string;
}


//
export const updateProfileApi = (params: paramsUpdateProfile) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const formData = createFormData(params);
  return apiService.postNormal(API_ENDPOINTS.UPDATE_PROFILE, formData, {
    'Content-Type': 'multipart/form-data',
  });
};
// favorite
export const getFavoriteSettingApi = () => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return apiService.get(API_ENDPOINTS.LIST_FAVORITE);
};
export const getListJobsApi = () => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return apiService.get(API_ENDPOINTS.LIST_JOBS);
};
export const updateFavoriteApi = (params: { list: number[] }) => {
  apiService.setBaseURL(ApiConfigs.baseURL);

  const formData = new FormData();
  params.list.forEach((item) => {
    formData.append('favorites[]', item?.toString());
  });


  return apiService.postNormal(API_ENDPOINTS.LIST_FAVORITE, formData, {
    'Content-Type': 'multipart/form-data',
  });
};

export const createFormData = (profileData: {
  fullname: string;
  phone: string;
  avatar: string;
  about_me: string;
  birthday: string;
  gender: string;
  galleries: string[];
  telegram?: string;
  whatsapp?: string;
  skype?: string;
  job?: string;
  display?: string;
  rel_status?: string;
  zalo?: string;
  facebook?: string;
  instagram?: string;
}) => {
  const data = new FormData();
  data.append('fullname', profileData.fullname);
  data.append('phone', profileData.phone);
  data.append('rel_status', profileData.rel_status);
  data.append('zalo', profileData.zalo);
  data.append('facebook', profileData.facebook);
  data.append('instagram', profileData.instagram);
  if (profileData.avatar.startsWith('file://')) {
    try {
      const fileType = profileData.avatar.split('.').pop();
      const mimeType = fileType === 'png' ? 'image/png' : 'image/jpeg';
      data.append('avatar', {
        uri: profileData.avatar,
        type: mimeType,
        name: `avatar.${fileType}`,
      });
    } catch (error) {
      console.error('Avatar file not found or invalid:', error);
    }
  } else {
    data.append('avatar', profileData.avatar);
  }
  data.append('about_me', profileData.about_me);
  data.append('birthday', profileData.birthday);
  data.append('gender', profileData.gender);
  if (profileData.telegram) { data.append('telegram', profileData.telegram); }
  if (profileData.whatsapp) { data.append('whatsapp', profileData.whatsapp); }
  if (profileData.skype) { data.append('skype', profileData.skype); }
  if (profileData.job) { data.append('job', profileData.job); }
  if (profileData.display) { data.append('display', profileData.display); }
  profileData.galleries.forEach((filePath, index) => {
    if (filePath.startsWith('file://')) {
      try {
        const fileType = filePath.split('.').pop();
        const mimeType = fileType === 'png' ? 'image/png' : 'image/jpeg';
        data.append(`galleries[${index}]`, {
          uri: filePath,
          type: mimeType,
          name: `galleries${index}.${fileType}`,
        });
      } catch (error) {
        console.error(`Gallery file not found or invalid at index ${index}:`, error);
      }
    } else {
      data.append(`galleries[${index}]`, filePath);
    }
  });
  return data;
};
// send location user

export const sendLocationUserApi = (params: { lat: number; lng: number }) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const formattedLocation = `${params.lat.toString().replace('.', '__')}__${params.lng.toString().replace('.', '__')}`;
  const formData = new FormData();
  formData.append('location', formattedLocation);
  return apiService.postNormal(API_ENDPOINTS.SEND_LOCATION, formData, {
    'Content-Type': 'multipart/form-data',
  });
};


export const sendFcmTokenApi = (params: { fcm_token: string, device_id: string }) => {
  // apiService.setBaseURL(ApiConfigs.baseURL);
  // const formData = new FormData();
  // formData.append('fcm_token', params.fcm_token);
  // formData.append('device_id', params.device_id);
  // return apiService.postNormal(API_ENDPOINTS.SEND_FCM_TOKEN, formData, {
  //   'Content-Type': 'multipart/form-data',
  // });
};
// /users/save/

export const getSavedPostApi = (type: PostTypeKey) => {
  apiService.setBaseURL(ApiConfigs.baseURL);

  return apiService.get(`${API_ENDPOINTS.GET_SAVE_POST}${type}`);
};

// use save post
export const useSavedPostApi = (type: PostTypeKey, paged?: number) => {
  return useApiQuery<any>(
    `${KeyQueryApi.GET_SAVED_POST}_${type}`,
    `${API_ENDPOINTS.GET_SAVE_POST}${type}`,
    { paged },
  );
};
export const callApiLogout = (device_id: string) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const formData = new FormData();
  formData.append('device_id', device_id);
  return apiService.postNormal(API_ENDPOINTS.LOGOUT, formData, {
    'Content-Type': 'multipart/form-data',
  });
};
