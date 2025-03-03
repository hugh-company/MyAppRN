import { ColorsApp, Spacing } from '@theme';
import React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const IconMessager = ({ width = Spacing.width50, height = Spacing.width50, color = ColorsApp.primary }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 53 53" fill="none">
      <G clipPath="url(#clip0_201_1378)">
        <Path
          d="M26.5 0C11.865 0 0 10.984 0 24.537A23.85 23.85 0 009.8 43.6l.069.047V53l9.028-4.951c2.277.651 4.891 1.025 7.594 1.025h.009c14.635 0 26.5-10.987 26.5-24.535S41.135 0 26.5 0zm2.63 33.043l-6.746-7.206-13.169 7.2L23.7 17.667l6.914 7.197 13.005-7.197L29.13 33.043z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_201_1378">
          <Path fill={color} d="M0 0H53V53H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default IconMessager;
