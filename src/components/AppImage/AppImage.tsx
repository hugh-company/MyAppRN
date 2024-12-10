import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageStyle, StyleProp } from 'react-native';
import FastImage, { ResizeMode, Source } from 'react-native-fast-image';
 
import { Box, useTheme } from '@theme';
import { NoImage } from '@assets';

interface propsImage {
  uri?: string;
  style?: StyleProp<ImageStyle> | any;
  resizeMode?: ResizeMode;
  defaultSource?: Source;
  imgSource?: Source;
  checkNetworking?: boolean;
}

export const AppImage = React.memo((props: propsImage) => {
  const {uri, style, resizeMode, defaultSource, checkNetworking, imgSource} = props;
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const {themeColors} = useTheme();
  useEffect(() => {
    setLoading(true);
  }, [uri]);

  useEffect(() => {
    if (uri) {
      fetch(uri).then(data => {        
        if (data.status !== 200) {          
          // setError(true);
          setLoading(false)
        }
      });
    }
  }, [uri, checkNetworking]);
  const source = isError ? NoImage : imgSource ? imgSource : uri ? {uri} : defaultSource || NoImage
  return (
    <Box justifyContent={'center'} alignItems="center" >
      <FastImage
        source={source}
        style={style}
        resizeMode={resizeMode}
        onLoadEnd={() => {
          setLoading(false)
        }}
        onError={() => setLoading(false)}
      />
      {isLoading && (
        <ActivityIndicator
            color={themeColors.colorMain4}
          style={{position: 'absolute'}}
        />
      )}
    </Box>
  );
});