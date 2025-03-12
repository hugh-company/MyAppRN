import { API_ENDPOINTS, ApiConfigs, apiService, KeyQueryApi } from '@api';
import { useApiQuery } from '@hooks';
import { detailPostResponseInterface, KeyTypeWithCategory, PostTypeKey } from '@types';
import i18next from 'i18next';
import { csrfTokenApi } from './loginService';

export const getDetailPostApi = (type: PostTypeKey, id: number) => {
  const uri = `${API_ENDPOINTS.DETAIL}${type}/${id}`;
  return apiService.get(uri);
};
// view list with type
export const getDetailListPostApi = (type: PostTypeKey, typeCategory: KeyTypeWithCategory) => {
  const uri = `${API_ENDPOINTS.LIST}${type}/${typeCategory}`;
  return apiService.get(uri);
};

// rating
interface ratingInterface {
  rating?: number;
  content?: string;
}
export const ratingPostApi = async (id: number, type: PostTypeKey, params: ratingInterface,) => {
  apiService.setBaseURL(ApiConfigs.baseURL);
  const responseToken: any = await csrfTokenApi();
  const uri = `${API_ENDPOINTS.RATING}${type}/${id}`;
  const formData = new FormData();
  formData.append('rating', params.rating?.toString());
  formData.append('content', params.content);
  formData.append('csrf_token', responseToken.data.csrf_token);
  return apiService.postNormal(uri, formData, {
    'Content-Type': 'multipart/form-data',

    // 'Content-Type': ' 'Content-Type': 'multipart/form-data'',
  });
};

// like

interface paramLikeMovie {
  like: 1 | 2;
  // 1: like, 2: dislike
}
export const likePostApi = async (
  id: number,
  type: PostTypeKey,
  params: paramLikeMovie,
) => {
  const responseToken: any = await csrfTokenApi();
  apiService.setBaseURL(ApiConfigs.baseURL);
  const newData = new FormData();
  newData.append('like', params.like.toString());
  newData.append('csrf_token', responseToken.data.csrf_token);

  return apiService.postNormal(
    `${API_ENDPOINTS.LIKE}${type}/${id}`,
    newData,
    {
      'Content-Type': 'multipart/form-data',
    },
  );
};

// favorite
export interface paramFavoriteMovie {
  posttype: PostTypeKey;
  post_id: number;
}
export const favoriteMovieApi = async (id: number, type: PostTypeKey) => {
  const responseToken: any = await csrfTokenApi();
  apiService.setBaseURL(ApiConfigs.baseURL);

  const formData = new FormData();
  formData.append('csrf_token', responseToken.data.csrf_token);
  return apiService.postNormal(`${API_ENDPOINTS.FAVORITE}${type}/${id}`, formData, {
    'Content-Type': 'multipart/form-data',
  });
};

export const savedPostApi = async (id: number, type: PostTypeKey) => {
  const responseToken: any = await csrfTokenApi();
  apiService.setBaseURL(ApiConfigs.baseURL);

  const formData = new FormData();
  formData.append('csrf_token', responseToken.data.csrf_token);
  return apiService.postNormal(`${API_ENDPOINTS.SAVED}${type}/${id}`, formData, {
    'Content-Type': 'multipart/form-data',
  });
};
// views
export const viewsPostApi = async (id: number, type: PostTypeKey) => {
  const responseToken: any = await csrfTokenApi();
  apiService.setBaseURL(ApiConfigs.baseURL);
  const formData = new FormData();
  formData.append('csrf_token', responseToken.data.csrf_token);
  return apiService.postNormal(
    `${API_ENDPOINTS.VIEW}${type}/${id}`,
    formData,
    {
      'Content-Type': 'multipart/form-data',
    },
  );
};

// use for get list of post
export const useDetailPostApi = (id: number, type: PostTypeKey) => {
  const lang = i18next.language;

  return useApiQuery<detailPostResponseInterface>(
    `${KeyQueryApi.POST_DETAIL}${type}${id}${lang}`,
    `${API_ENDPOINTS.DETAIL}${type}/${id}`,

  );
};
export const getResolutionsFromM3U8 = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Không thể tải file M3U8');
    }

    const text = await response.text(); // Lấy nội dung file M3U8 dưới dạng chuỗi
    const lines = text.split('\n'); // Tách thành từng dòng

    const resolutions = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('RESOLUTION=')) {
        const match = lines[i].match(/RESOLUTION=(\d+x\d+)/);
        if (match) {
          resolutions.push({
            resolution: match[1], // Lưu độ phân giải (ví dụ: "1280x720")
            url: lines[i + 1].trim(), // Đường link phát video tương ứng
          });
        }
      }
    }
    console.log({ resolutions });

    return resolutions; // Trả về danh sách độ phân giải
  } catch (error) {
    console.error('Lỗi lấy danh sách phân giải:', error);
    return [];
  }
};
