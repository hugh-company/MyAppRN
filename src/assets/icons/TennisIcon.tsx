import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const TennisIcon = ({ width = Spacing.width19, height = Spacing.width20, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 1.292a8.708 8.708 0 100 17.416 8.708 8.708 0 000-17.416zm2.537 11.336c1.079-1.013 2.592-1.8 4.547-1.854a7.128 7.128 0 01-6.276 6.306c.105-2.057.717-3.502 1.729-4.452zm-3.314 4.455c.107-2.368.814-4.279 2.23-5.61 1.343-1.26 3.232-2.227 5.627-2.283a7.128 7.128 0 00-6.32-6.275c-.155 2.37-.833 4.29-2.13 5.653-1.32 1.387-3.27 2.08-5.713 2.206a7.128 7.128 0 006.306 6.31zm-.051-14.16C8.52 5 7.926 6.485 6.982 7.477c-.93.977-2.406 1.588-4.561 1.711a7.128 7.128 0 016.25-6.265z"
        fill={color}
      />
    </Svg>
  );
};

export default TennisIcon;
