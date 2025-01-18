import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const HeadIcon = ({ width = Spacing.width48, height = Spacing.width49, color = '#fff' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 48 49" fill="none">
      <Path
        d="M15 8.5c-6.075 0-11 4.925-11 11 0 11 13 21 20 23.326C31 40.5 44 30.5 44 19.5c0-6.075-4.925-11-11-11-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0015 8.5z"
        fill={color}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HeadIcon;
