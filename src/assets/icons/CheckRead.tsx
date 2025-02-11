import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const CheckRead = ({ width = Spacing.width16, height = Spacing.width16, color = 'white' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 14l3.233 2.425a1 1 0 001.374-.167L18 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default CheckRead;
