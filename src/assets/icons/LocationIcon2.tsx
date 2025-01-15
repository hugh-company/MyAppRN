import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const LocationIcon2 = ({ width = Spacing.width16, height = Spacing.width30, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 30" fill="none">
      <Path d="M8 28.4A3.2 3.2 0 108 22a3.2 3.2 0 000 6.4z" fill="#fff" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 22.78a2.42 2.42 0 100 4.841 2.42 2.42 0 000-4.842zM4 25.2a4 4 0 118 0 4 4 0 01-8 0z"
        fill="#B2B2B2"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.2 15.561h1.6v8H7.2v-8z"
        fill="#fff"
      />
      <Path d="M8 16.4a8 8 0 100-16 8 8 0 000 16z" fill="#fff" />
      <Path d="M8 10.8A2.4 2.4 0 108 6a2.4 2.4 0 000 4.8z" fill="#B2B2B2" />
    </Svg>
  );
};

export default LocationIcon2;
