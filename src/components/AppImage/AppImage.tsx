import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import FastImage, { ResizeMode, Source } from 'react-native-fast-image';

import { NoImage } from '@assets';
import { Box, useTheme } from '@theme';

interface propsImage {
  uri?: string | null;
  style?: StyleProp<ImageStyle> | any;
  resizeMode?: ResizeMode;
  defaultSource?: Source | null;
  imgSource?: Source;
  checkNetworking?: boolean;
}

export const AppImage = React.memo((props: propsImage) => {
  const { uri, style, resizeMode, defaultSource, checkNetworking, imgSource } = props;
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const { colors } = useTheme();
  useEffect(() => {
    setLoading(true);
  }, [uri]);

  useEffect(() => {
    if (uri) {
      fetch(uri).then(data => {
        if (data.status !== 200) {
          // setError(true);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, [uri, checkNetworking]);
  const source = isError ? NoImage : imgSource ? imgSource : uri ? { uri } : (defaultSource ? defaultSource : NoImage);
  return (
    <Box justifyContent={'center'} alignItems="center" >
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
        <ActivityIndicator
          color={colors.primary}
          style={{ position: 'absolute' }}
        />
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

