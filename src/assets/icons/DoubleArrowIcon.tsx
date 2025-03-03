import { Spacing } from '@theme';
import React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const DoubleArrowIcon = ({ size = Spacing.width24, color = '#fff' }: IconWidthHeightProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_6_13424)" fill={color}>
        <Path d="M15.5 5H11l5 7-5 7h4.5l5-7-5-7z" />
        <Path d="M8.5 5H4l5 7-5 7h4.5l5-7-5-7z" />
      </G>
      <Defs>
        <ClipPath id="clip0_6_13424">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default DoubleArrowIcon;
