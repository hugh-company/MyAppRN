import { Spacing } from '@theme';
import React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const IconFilter = ({ width = Spacing.width16, height = Spacing.width16, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <G
        clipPath="url(#clip0_5471_7367)"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M11.5 5h2M2.5 5h7M7.5 11h6M2.5 11h3M9.5 3.5v3M5.5 9.5v3" />
      </G>
      <Defs>
        <ClipPath id="clip0_5471_7367">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default IconFilter;
