import {Share} from 'react-native';

export const onShareInfo = async (title: string, url: string) => {
  try {
    await Share.share({
      title: title,
      message: title,
      url: url,
    });
  } catch (error) {
    console.log(error);
  }
};
