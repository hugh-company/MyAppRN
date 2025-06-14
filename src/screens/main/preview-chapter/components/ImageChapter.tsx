import { NoImage } from '@assets';
import { AppZoomImage } from '@components';
import { ColorsApp, HeightScreen, WidthScreen } from '@theme';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

interface ImageChapterProps {
  uri: string;
  onPress?: () => void;
}

// Pre-define screen width to avoid multiple calls to Dimensions API
const screenWidth = Dimensions.get('window').width;
const defaultHeight = 400; // Use a default height initially

const ImageChapter = ({ uri, onPress }: ImageChapterProps) => {
  const [heightImage, setHeightImage] = useState<number>(defaultHeight);
  const [status, setStatus] = useState({ isLoading: true, isError: false });

  // Use callbacks for status updates to prevent recreation on each render
  const handleLoadStart = useCallback(() => {
    setStatus({ isLoading: true, isError: false });
  }, []);

  const handleLoadEnd = useCallback(() => {
    setStatus({ isLoading: false, isError: false });
  }, []);

  const handleError = useCallback(() => {
    setStatus({ isLoading: false, isError: true });
  }, []);

  // Calculate image height once when the URI changes
  useEffect(() => {
    let isMounted = true;

    // Check if uri is valid before attempting to get size
    if (!uri) {
      if (isMounted) {
        setStatus({ isLoading: false, isError: true });
      }
      return;
    }

    // Prefetch the image
    FastImage.preload([{ uri }]);

    Image.getSize(
      uri,
      (width, height) => {
        if (isMounted && width > 0) {
          const scaleFactor = screenWidth / width;
          const calculatedHeight = height * scaleFactor;
          setHeightImage(
            calculatedHeight > 0 ? calculatedHeight : defaultHeight
          );
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
        style={[styles.image, { height: defaultHeight }]}
        resizeMode="contain"
      />
    );
  }

  return (
    <AppZoomImage>
      <FastImage
        source={{
          uri,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        style={[styles.image, { height: heightImage }]}
        resizeMode="contain"
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />
    </AppZoomImage>
  );
};

const styles = StyleSheet.create({
  image: {
    width: WidthScreen,
    height: 400, // Default height
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

// Use React.memo with a custom equality function to prevent unnecessary re-renders
export default React.memo(ImageChapter, (prevProps, nextProps) =>
  prevProps.uri === nextProps.uri && prevProps.onPress === nextProps.onPress
);
