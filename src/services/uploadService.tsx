import { apiService } from '@api';

export const uploadImages = async ({
  images,
  path,
  token,
}: {
  images: string[];
  path: string;
  token: string;
}): Promise<any> => {
  const formData = new FormData();
  images.forEach((image: any) => {
    const extension = image.split('.').pop(); // Assuming all images are jpg, modify if needed
    const randomText = Math.random().toString(36).substring(2, 15);
    const filename = `image${randomText}.${extension}`;
    formData.append('files[]', {
      uri: image,
      name: filename,
      type: `image/${extension}`,
    });
  });
  formData.append('path', path);
  formData.append('token', token);
  try {
    const response = await apiService.postNormal('/files/upload/', formData, {
      'Content-Type': 'multipart/form-data',
    });
    if (!response) {
      throw new Error('Failed to upload images');
    }

    return response;
  } catch (error) {
    throw error;
  }
};
