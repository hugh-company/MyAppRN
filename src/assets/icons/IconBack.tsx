import { Colors } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const IconBack = ({ size = 24, color = Colors.black }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Path
        d="M30 10L16 24L30 38"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
