import { Spacing } from '@theme';
import React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const SkipNextIcon = ({ width = Spacing.width24, height = Spacing.width24, color = '#fff' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_6_8412)">
        <Path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" fill={color} />
      </G>
      <Defs>
        <ClipPath id="clip0_6_8412">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SkipNextIcon;
