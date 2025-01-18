import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const ShapeIcon = ({ width = Spacing.width24, height = Spacing.width24, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 10.5a3.5 3.5 0 003.5 3.5l3.5 3.5v-7a3.5 3.5 0 10-7 0zM3 10.5A3.5 3.5 0 006.5 14l3.5 3.5v-7a3.5 3.5 0 10-7 0z"
        fill="#000"
        fillOpacity={0.15}
      />
      <Path
        d="M13 10.5a3.5 3.5 0 003.5 3.5l3.5 3.5v-7a3.5 3.5 0 10-7 0zM3 10.5A3.5 3.5 0 006.5 14l3.5 3.5v-7a3.5 3.5 0 10-7 0z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ShapeIcon;
