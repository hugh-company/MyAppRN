import Share from 'react-native-share';

export const onShareInfo = async (title: string, url: string) => {
  try {
    const options = {
      title,
      message: title,
      url: url,
      failOnCancel: false,
    };

    await Share.open(options);
  } catch (error) {
    console.log(error);
  }
};
