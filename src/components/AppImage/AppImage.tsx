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
  const [isLoading, setLoading] = useState(true);
  const uriBase = isBase ? `${BASE_IMAGE_URL}${uri}` : uri;

  useEffect(() => {
    if (uriBase) {
      fetch(uriBase).then(data => {
        setLoading(data.status !== 200);
      }).catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [uriBase, checkNetworking]);

  const source = imgSource || (uri ? { uri: uriBase } : defaultSource || NoImage);

  return (
    <Box justifyContent={'center'} alignItems="center">
      <FastImage
        source={source}
        style={[styles.image, style]}
        resizeMode={resizeMode}
        onLoadEnd={() => setLoading(false)}
        tintColor={tintColor}
        onError={() => setLoading(false)}
      />
      {isLoading && (
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

