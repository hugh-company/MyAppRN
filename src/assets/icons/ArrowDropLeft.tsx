import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const ArrowDropLeft = ({ width = Spacing.width24, height = Spacing.width24, color = 'white' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.293 11.795l8.448-5.914A.8.8 0 0117 6.537v10.927a.8.8 0 01-1.259.655l-8.448-5.914a.25.25 0 010-.41z"
        fill={color}
      />
    </Svg>
  );
};

export default ArrowDropLeft;
