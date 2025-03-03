import { API_ENDPOINTS, ApiConfigs, apiService, KeyQueryApi } from '@api';
import { useApiQuery } from '@hooks';
import { genderInterface, responseDatingNearYou, TypeTabDatingApi } from '@types';

export interface UserFindInterface {
  // /finder/finds/?age=18-44&gender=female&location=11__98755__106__321124&distance=10
  age?: string;
  gender?: genderInterface;
  location?: {
    latitude: number;
    longitude: number;
  };
  distance?: number;
}
export const findUserApi = async (params: UserFindInterface) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const location = `${params.location?.latitude.toString().replace('.', '__')}__${params.location?.longitude.toString().replace('.', '__')}`;
  let newParams: any = {
    age: params.age,
    distance: params.distance,
    location,
  };
  if (params?.gender) {
    newParams = {
      ...newParams,
      gender: params.gender,
    };
  }

  return apiService.get(API_ENDPOINTS.FIND_DATING, newParams);
};
export const getDatingDashboardApi = async (type: TypeTabDatingApi, params?: any) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return apiService.get<responseDatingNearYou>(API_ENDPOINTS.DATING_HOME + type, params);
};
export const getDetailUserApi = async (id: number) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  return apiService.get(API_ENDPOINTS.DETAIL_USER + id);
};
//
export const useDatingDashboardApi = (type: TypeTabDatingApi, params?: any) => {
  return useApiQuery<responseDatingNearYou>(
    KeyQueryApi.DASHBOARD_DATING,
    API_ENDPOINTS.DATING_HOME + type,
    params
  );
};
export const mockUserData: UserFindInterface[] = [
  {
    id: 1,
    fullname: 'Nguyễn Văn A',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    gender: 'male',
    birthday: '1995-06-15',
    galleries: [
      'https://randomuser.me/api/portraits/men/2.jpg',
      'https://randomuser.me/api/portraits/men/3.jpg',
      'https://randomuser.me/api/portraits/men/4.jpg',
    ],
    favorites: ['travel', 'music', 'reading'],
    job: 'Software Engineer',
    distance_km: 5,
    location: {
      latitude: 10.7769,
      longitude: 106.7009,
    },
  },
  {
    id: 2,
    fullname: 'Trần Thị B',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    gender: 'female',
    birthday: '1998-03-21',
    galleries: [
      'https://randomuser.me/api/portraits/women/3.jpg',
      'https://randomuser.me/api/portraits/women/4.jpg',
    ],
    favorites: ['yoga', 'photography', 'movies'],
    job: 'Graphic Designer',
    distance_km: 8,
    location: {
      latitude: 10.7905,
      longitude: 106.7219,
    },
  },
  {
    id: 3,
    fullname: 'Lê Văn C',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    gender: 'male',
    birthday: '2000-12-05',
    galleries: [
      'https://randomuser.me/api/portraits/men/6.jpg',
      'https://randomuser.me/api/portraits/men/7.jpg',
      'https://randomuser.me/api/portraits/men/8.jpg',
      'https://randomuser.me/api/portraits/men/9.jpg',
    ],
    favorites: ['gaming', 'coding', 'gym'],
    job: 'Data Scientist',
    distance_km: 2,
    location: {
      latitude: 10.7627,
      longitude: 106.6822,
    },
  },
  {
    id: 4,
    fullname: 'Phạm Minh D',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    gender: 'non-binary',
    birthday: '1997-08-30',
    galleries: [
      'https://randomuser.me/api/portraits/men/11.jpg',
      'https://randomuser.me/api/portraits/men/12.jpg',
    ],
    favorites: ['cooking', 'traveling', 'music'],
    job: 'Chef',
    distance_km: 15,
    location: {
      latitude: 10.7453,
      longitude: 106.6781,
    },
  },
  {
    id: 5,
    fullname: 'Hoàng Thanh E',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    gender: 'female',
    birthday: '1999-11-14',
    galleries: [
      'https://randomuser.me/api/portraits/women/6.jpg',
      'https://randomuser.me/api/portraits/women/7.jpg',
      'https://randomuser.me/api/portraits/women/8.jpg',
    ],
    favorites: ['fashion', 'dancing', 'art'],
    job: 'Model',
    distance_km: 12,
    location: {
      latitude: 10.8019,
      longitude: 106.7073,
    },
  },
];
