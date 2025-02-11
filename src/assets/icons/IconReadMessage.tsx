import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const IconReadMessage = ({ width = Spacing.width16, height = Spacing.width16, color = 'white' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 13l4.228 3.382a1 1 0 001.398-.148L22 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.19 12.237l4.584-5.604a1 1 0 00-1.548-1.266l-4.573 5.59 1.536 1.28zm-3.167 3.87l-1.537-1.28-.653.798L2.6 13.2a1 1 0 00-1.2 1.6l3.233 2.425a2 2 0 002.748-.334l.642-.784z"
        stroke={color}
      />
    </Svg>
  );
};

export default IconReadMessage;
