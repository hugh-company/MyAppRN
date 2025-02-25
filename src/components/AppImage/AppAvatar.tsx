import React, { useEffect, useState } from 'react';
import { ImageStyle, StyleProp, StyleSheet, View } from 'react-native';
import FastImage, { ResizeMode } from 'react-native-fast-image';

import { BASE_IMAGE_URL } from '@api';
import { NoAvatarImage, NoImage } from '@assets';
import { Box, ColorsApp } from '@theme';
interface propsImage {
  uri?: string | null;
  style?: StyleProp<ImageStyle> | any;
  resizeMode?: ResizeMode;
}

export const AppAvatar = React.memo((props: propsImage) => {
  const { uri, style, resizeMode } = props;
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const uriBase = `${BASE_IMAGE_URL}${uri}`;

  useEffect(() => {
    setLoading(true);
  }, [uriBase]);

  useEffect(() => {

    if (uriBase) {
      fetch(uriBase).then(data => {
        if (data.status !== 200) {
          setError(true);
          setLoading(false);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [uriBase]);

  const source = isError ? NoImage : uri ? { uri: uriBase } : NoAvatarImage;

  return (
    <Box justifyContent={'center'} alignItems="center">
      <FastImage
        source={source}
        style={[styles.image, style]}
        resizeMode={resizeMode}
        onLoadEnd={() => {
          setLoading(false);
        }}
        onError={() => setLoading(false)}
      />
      {isLoading && (

        <View style={[styles.image, style]} />

      )}
    </Box>
  );
});
const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',

  },
  imageLoading: {
    height: '100%',
    width: '100%',
    backgroundColor: ColorsApp.skeleton,
  },
});
