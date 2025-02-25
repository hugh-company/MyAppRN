import { NoImage } from '@assets';
import { ColorsApp, WidthScreen } from '@theme';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

interface ImageChapterProps {
  uri: string;
  onPress?: () => void;
}

const ImageChapter = ({ uri, onPress }: ImageChapterProps) => {
  const [heightImage, setHeightImage] = useState<number>(0);
  const [status, setStatus] = useState({ isLoading: true, isError: false });

  useEffect(() => {
    let isMounted = true;
    Image.getSize(
      uri,
      (width, height) => {
        if (isMounted) {
          const screenWidth = Dimensions.get('window').width;
          const scaleFactor = screenWidth / width;
          const imageHeight = height * scaleFactor;
          setHeightImage(imageHeight);
          setStatus({ isLoading: false, isError: false });
        }
      },
      error => {
        if (isMounted) {
          console.error('Error fetching image size:', error);
          setStatus({ isLoading: false, isError: true });
        }
      },
    );
    return () => {
      isMounted = false;
    };
  }, [uri]);

  if (status.isLoading) {
    return <ActivityIndicator style={styles.imageLoading} size="large" color="#0000ff" />;
  }

  if (status.isError) {
    return (
      <FastImage
        source={NoImage}
        style={[styles.image, { height: heightImage }]}
        resizeMode="contain"
      />
    );
  }

  return (
    <FastImage
      source={{ uri }}
      style={[styles.image, { height: heightImage }]}
      resizeMode="contain"
      onLoadStart={() => setStatus({ isLoading: true, isError: false })}
      onLoadEnd={() => setStatus({ isLoading: false, isError: false })}
      onError={() => setStatus({ isLoading: false, isError: true })}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: WidthScreen,
    height: 300,
  },
  imageLoading: {
    width: WidthScreen,
    height: 300,
    backgroundColor: ColorsApp.skeleton,
  },
});

export default React.memo(ImageChapter);
