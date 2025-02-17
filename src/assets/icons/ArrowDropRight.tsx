import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const ArrowDropRight = ({ width = Spacing.width24, height = Spacing.width24, color = 'white' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.707 11.795L10.26 5.881A.8.8 0 009 6.537v10.927a.8.8 0 001.259.655l8.448-5.914a.25.25 0 000-.41z"
        fill={color}
      />
    </Svg>
  );
};

export default ArrowDropRight;
