import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const SaveMovieIcon = ({ width = Spacing.width32, height = Spacing.width32, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 2.667C8.636 2.667 2.667 8.637 2.667 16c0 7.364 5.97 13.334 13.333 13.334h10.667v-2.667H24a13.333 13.333 0 005.24-12.253l-2.649.313a10.749 10.749 0 01-.867 5.663 10.666 10.666 0 11-7.058-14.72l.664-2.583a13.34 13.34 0 00-3.33-.42zm-2.667 8a2.667 2.667 0 105.334 0 2.667 2.667 0 00-5.334 0zM8 16a2.667 2.667 0 105.333 0A2.667 2.667 0 008 16zm10.667 0A2.667 2.667 0 1024 16a2.667 2.667 0 00-5.333 0zm-5.334 5.334a2.667 2.667 0 105.334 0 2.667 2.667 0 00-5.334 0z"
        fill="#fff"
      />
      <Path
        d="M21.333 2c0-.471.309-1.041.89-1.041h6.221c.58 0 .89.57.89 1.04v8.89c0 .833-.871 1.42-1.593.935l-2.337-1.575a.122.122 0 00-.14 0l-2.339 1.575c-.721.486-1.592-.102-1.592-.934V2z"
        fill="#fff"
      />
    </Svg>
  );
};

export default SaveMovieIcon;
