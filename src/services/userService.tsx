import { API_ENDPOINTS, ApiConfigs, apiService } from '@api';
import { genderInterface, UserFindInterface } from '@types';
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

  galleries: string[];

}
export const updateProfileApi = (params: paramsUpdateProfile) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const formData = createFormData(params);
  return apiService.put(API_ENDPOINTS.UPDATE_PROFILE, formData, {
    'Content-Type': 'application/x-www-form-urlencoded',
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

  return apiService.put(API_ENDPOINTS.FAVORITE, params);
};

export const createFormData = (profileData: {
  fullname: string;
  phone: string;
  avatar: string;
  about_me: string;
  birthday: string;
  gender: string;
  galleries: string[];
}) => {
  const data = new FormData();
  data.append('fullname', profileData.fullname);
  data.append('phone', profileData.phone);
  if (profileData.avatar.startsWith('file://')) {
    data.append('avatar', {
      uri: profileData.avatar,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });
  } else {
    data.append('avatar', profileData.avatar);
  }

  data.append('about_me', profileData.about_me);
  data.append('birthday', profileData.birthday);
  data.append('gender', profileData.gender);
  profileData.galleries.forEach((filePath, index) => {
    data.append(`galleries[${index}]`, {
      uri: profileData.avatar,
      type: 'image/jpeg',
      name: `galleries${index}.jpg`,
    });
  });
  return data;
};
export const dataUserFinding: UserFindInterface[] = [
  {
    id: 1,
    fullname: 'Jessica Parker',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    gender: 'female',
    birthday: '1995-07-15',
    personal: {
      favorites: ['Traveling', 'Photography', 'Reading'],
      job: 'Photographer',
      galleries: [
        'https://images.unsplash.com/photo-1511424187101-2aaa60069357?w=400',
        'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400',
      ],
    },
    distance_km: 5,
  },
  {
    id: 2,
    fullname: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    gender: 'male',
    birthday: '1990-03-22',
    personal: {
      favorites: ['Hiking', 'Music', 'Gaming'],
      job: 'Graphic Designer',
      galleries: [
        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
      ],
    },
    distance_km: 3,
  },
  {
    id: 3,
    fullname: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    gender: 'female',
    birthday: '1992-10-10',
    personal: {
      job: 'Software Engineer',
      favorites: ['Cooking', 'Fitness', 'Yoga'],
      galleries: [
        'https://images.unsplash.com/photo-1502767089025-6572583495b3?w=400',
        'https://images.unsplash.com/photo-1511424187101-2aaa60069357?w=400',
      ],
    },
    distance_km: 7,
  },
  {
    id: 4,
    fullname: 'Michael Johnson',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400',
    gender: 'male',
    birthday: '1988-05-12',
    personal: {
      favorites: ['Running', 'Cycling', 'Fishing'],
      job: 'Product Manager',
      galleries: [
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400',
        'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=400',
      ],
    },
    distance_km: 2,
  },
  {
    id: 5,
    fullname: 'Sophia Brown',
    avatar: 'https://images.unsplash.com/photo-1531256379411-66a6c1e02c77?w=400',
    gender: 'female',
    birthday: '1998-01-25',
    personal: {
      favorites: ['Dancing', 'Movies', 'Art'],
      job: 'UX/UI Designer',
      galleries: [
        'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400',
        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400',
      ],
    },
    distance_km: 10,
  },
];
