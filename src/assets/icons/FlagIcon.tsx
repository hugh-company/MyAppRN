import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const FlagIcon = ({ width = Spacing.width28, height = Spacing.width28, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
      <Path
        d="M4.667 4.667v11.666h18.666L17.5 10.5l5.833-5.833H4.667z"
        fill="#000"
        fillOpacity={0.15}
      />
      <Path
        d="M4.667 24.5v-8.167m0 0V4.667h18.666L17.5 10.5l5.833 5.833H4.667z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default FlagIcon;
