import {BASE_STICKER_URL} from '../api/apiConfig';

export const getStickerIcon = (
  folderSticker: string,
  stickerName: string,
): string => {
  return `${BASE_STICKER_URL}${folderSticker}/${stickerName}.gif`;
};
export const getStickerIconWithMessage = (name: string): string => {
  // "sticker:sticker_name"
  const [folderSticker, stickerName] = name.split(':');
  if (!folderSticker || !stickerName) {
    return '';
  }
  // Check if the sticker name is valid
  return `${BASE_STICKER_URL}${folderSticker}/${stickerName}.gif`;
};
