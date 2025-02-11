import React, { useEffect, useState } from 'react';
import { ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import FastImage, { ResizeMode, Source } from 'react-native-fast-image';

import { BASE_IMAGE_URL } from '@api';
import { NoImage } from '@assets';
import { Box } from '@theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface propsImage {
  uri?: string | null;
  style?: StyleProp<ImageStyle | ViewStyle> | any;
  resizeMode?: ResizeMode;
  defaultSource?: Source | null;
  imgSource?: Source;
  checkNetworking?: boolean;
  isBase?: boolean;
  tintColor?: string;
}

export const AppImage = React.memo((props: propsImage) => {
  const { uri, style, resizeMode, defaultSource, isBase = true, checkNetworking, tintColor = undefined, imgSource } = props;
  const [status, setStatus] = useState({ isLoading: true, isError: false });
  const uriBase = isBase ? `${BASE_IMAGE_URL}${uri}` : uri;

  useEffect(() => {
    if (uriBase && !defaultSource) {
      fetch(uriBase).then(data => {
        setStatus({ isLoading: false, isError: false });
      }).catch(() => {
        setStatus({ isLoading: false, isError: true });
      });
    } else {
      setStatus({ isLoading: false, isError: false });
    }
  }, [uriBase, checkNetworking]);

  const source = status.isError ? NoImage : (imgSource || (uri ? { uri: uriBase } : defaultSource || NoImage));



  return (
    <Box justifyContent={'center'} alignItems="center">
      <FastImage
        key={uriBase}
        source={source}
        style={[styles.image, style]}
        resizeMode={resizeMode}
        onLoadEnd={() => setStatus(prev => ({ ...prev, isLoading: false }))}
        tintColor={tintColor}
        onError={() => setStatus({ isLoading: false, isError: true })}
      />
      {status.isLoading && (
        <SkeletonPlaceholder>
          <View style={[styles.image, style]} />
        </SkeletonPlaceholder>
      )}
    </Box>
  );
});

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',

  },
});

