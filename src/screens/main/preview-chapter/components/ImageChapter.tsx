import { AppImage } from '@components';
import { WidthScreen } from '@theme';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';

interface ImageChapterProps {
  uri: string;
}

const ImageChapter = ({ uri }: ImageChapterProps) => {
  const [heightImage, setHeightImage] = useState<number>(0);

  useEffect(() => {
    Image.getSize(
      uri,
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
