import { NoImage } from '@assets';
import { AppZoomImage } from '@components';
import { ColorsApp, HeightScreen, WidthScreen } from '@theme';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
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
          setHeightImage(height * scaleFactor);
          setStatus({ isLoading: false, isError: false });
        }
      },
      error => {
        if (isMounted) {
          setStatus({ isLoading: false, isError: true });
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, [uri]);

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
    <AppZoomImage>
      <FastImage
        source={{ uri }}
        style={[styles.image, { height: heightImage }]}
        resizeMode="contain"
        onLoadStart={() => setStatus({ isLoading: true, isError: false })}
        onLoadEnd={() => setStatus({ isLoading: false, isError: false })}
        onError={() => setStatus({ isLoading: false, isError: true })}
      />
    </AppZoomImage>
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
  imageContainer: {
    width: WidthScreen,
    height: HeightScreen / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(ImageChapter, (prevProps, nextProps) =>
  prevProps.uri === nextProps.uri && prevProps.onPress === nextProps.onPress
);
