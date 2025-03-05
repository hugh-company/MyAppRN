import React, { useEffect, useMemo, useState } from 'react';
import { StyleProp, StyleSheet } from 'react-native';
import FastImage, { ImageStyle as FastImageStyle, ResizeMode, Source } from 'react-native-fast-image';

import { BASE_IMAGE_URL } from '@api';
import { NoImage } from '@assets';
import { Box } from '@theme';

interface PropsImage {
  style?: StyleProp<FastImageStyle>;
  resizeMode?: ResizeMode;
  defaultSource?: Source | null;
  imgSource?: Source;
  checkNetworking?: boolean;
  isBase?: boolean;
  tintColor?: string;
  disableCache?: boolean; // mới: bật tùy chọn không cache
  uri: string;
}

const AppImageComponent = (props: PropsImage) => {
  const {
    uri,
    style,
    resizeMode = FastImage.resizeMode.cover,
    defaultSource,
    imgSource,
    isBase = true,
    checkNetworking = true,
    tintColor,
    disableCache = false,
  } = props;

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const uriBase = isBase ? `${BASE_IMAGE_URL}${uri}` : uri;

  // Nếu cần kiểm tra kết nối thì sử dụng FastImage callbacks để cập nhật trạng thái
  useEffect(() => {
    // Reset trạng thái khi uri thay đổi
    setHasError(false);
    setIsLoading(false);
  }, [uriBase, checkNetworking]);

  // Tính toán source với caching option, dùng useMemo để tránh tính lại không cần thiết
  const source: Source = useMemo(() => {
    if (!checkNetworking) { return { uri: uriBase }; }
    if (hasError) { return NoImage; }
    if (imgSource) { return imgSource; }
    if (uri) { return { uri: uriBase, cache: disableCache ? 'reload' : 'immutable' }; }
    return defaultSource || NoImage;
  }, [uriBase, checkNetworking, hasError, imgSource, uri, defaultSource, disableCache]);

  return (
    <Box justifyContent="center" alignItems="center">
      <FastImage
        source={source}
        style={[styles.image, style]}
        resizeMode={resizeMode}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        tintColor={tintColor}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
});

export const AppImage = React.memo(AppImageComponent);
