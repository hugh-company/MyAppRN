import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const SaveComicIcon = ({ width = Spacing.width32, height = Spacing.width32, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Path
        d="M21.333 2c0-.471.309-1.041.89-1.041h6.221c.58 0 .89.57.89 1.04v8.89c0 .833-.871 1.42-1.593.935l-2.337-1.575a.122.122 0 00-.14 0l-2.339 1.575c-.721.486-1.592-.102-1.592-.934V2z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.667 4A5.33 5.33 0 0016 5.636a5.334 5.334 0 00-4-1.805H4a1.333 1.333 0 00-1.333 1.333v20.17A1.333 1.333 0 004 26.667h10.667v2.667h2.666v-2.667H28a1.333 1.333 0 001.333-1.333V14.667h-2.666V24h-9.334V9.164a2.667 2.667 0 011.334-2.309V4zm-4 5.164V24H5.333V6.498H12a2.667 2.667 0 012.667 2.666z"
        fill="#fff"
      />
    </Svg>
  );
};

export default SaveComicIcon;
