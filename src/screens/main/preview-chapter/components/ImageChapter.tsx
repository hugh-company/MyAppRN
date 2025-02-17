import { BASE_IMAGE_URL } from '@api';
import { AppImage } from '@components';
import { WidthScreen } from '@theme';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';

interface ImageChapterProps {
  uri: string;
  onPress?: () => void;
}

const ImageChapter = ({ uri, onPress }: ImageChapterProps) => {
  const [heightImage, setHeightImage] = useState<number>(0);

  useEffect(() => {
    Image.getSize(
      `${BASE_IMAGE_URL}${uri}`,
      (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = screenWidth / width;
        const imageHeight = height * scaleFactor;
        setHeightImage(imageHeight);
      },
      error => {
        console.error('Error fetching image size:', error);
      },
    );
  }, [uri]);

  return (

    <AppImage uri={uri} style={{ width: WidthScreen, height: heightImage }} />

  );
};
const styles = StyleSheet.create({
  image: {
    width: WidthScreen,
    height: 300,
  },
});
export default React.memo(ImageChapter);
