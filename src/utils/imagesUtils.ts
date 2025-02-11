import {API_ENDPOINTS, BASE_IMAGE_URL} from '@api';

export const getLinkImageChat = (
  thread_id: string | number,
  message_id: string,
  index: number,
) => {
  return `${BASE_IMAGE_URL}${API_ENDPOINTS.GET_IMAGE_CHAT}/${thread_id}/${message_id}_${index}.webp`;
};
