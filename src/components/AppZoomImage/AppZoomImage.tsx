import { useTheme } from '@theme';
import React from 'react';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SnapbackZoom } from 'react-native-zoom-toolkit'; // Thư viện ZoomView
import { createStyles } from './styles';

export interface AppZoomImageProps {
  uri?: string; // Make uri optional
  containerStyle?: object; // New prop for container style
  imageStyle?: object; // New prop for image style
  minScale?: number; // New prop for minimum scale
  maxScale?: number; // New prop for maximum scale
  doubleTapToZoomIn?: boolean; // New prop for double tap to zoom in
  doubleTapToZoomOut?: boolean; // New prop for double tap to zoom out
  children?: React.ReactNode; // New prop for children
}

const { width, height } = Dimensions.get('window');

const AppZoomImage = ({
  uri,
  imageStyle,
  children, // Destructure children
}: AppZoomImageProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  return (
    <SnapbackZoom

    >
      {uri ? (
        <FastImage
          source={{ uri }}
          style={[{ width: width, height: height }, imageStyle]}
          resizeMode="contain"
        />
      ) : (
        children // Render children if uri is not provided
      )}
    </SnapbackZoom>

  );
};

export default AppZoomImage;
