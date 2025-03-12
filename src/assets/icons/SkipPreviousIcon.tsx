import { Spacing } from '@theme';
import React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const SkipPreviousIcon = ({ width = Spacing.width24, height = Spacing.width24, color = '#fff' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_6_8410)">
        <Path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" fill={color} />
      </G>
      <Defs>
        <ClipPath id="clip0_6_8410">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SkipPreviousIcon;
