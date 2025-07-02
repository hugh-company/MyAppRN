import { Spacing } from '@theme';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import { IconProps } from '../types';

const SeoKeywork = ({ size = Spacing.width24, color = 'white', ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" >
    <G clipPath="url(#clip0_5_24)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.544 14.046A6.697 6.697 0 1112.14 2.667a6.68 6.68 0 011.416 2.085h-2.315a4.663 4.663 0 10-.54 5.95c.203-.203-.731 1.143-.731 2.464 0 .14.008.28.023.416a6.685 6.685 0 01-1.759.468l.03 2.875h.045a.612.612 0 01.618.598l.077 5.126a.61.61 0 01-.6.617l-1.907.028a.612.612 0 01-.618-.6l-.075-5.123a.608.608 0 01.599-.619l.17-.002-.03-2.904zm16.75-8.07v2.856a.47.47 0 01-.47.47H6.503a.47.47 0 01-.471-.47V5.976a.47.47 0 01.47-.471h16.32a.47.47 0 01.471.47zM9.777 6.64v1.526a.377.377 0 00.753 0V6.64a.377.377 0 00-.753 0zm1.374 0v1.526a.377.377 0 00.753 0V6.64a.377.377 0 00-.753 0zm-4.124 0v1.526a.377.377 0 00.753 0V6.64a.377.377 0 00-.753 0zm1.375 0v1.526a.377.377 0 00.753 0V6.64a.377.377 0 00-.753 0zm5.365 16.468a.235.235 0 01-.345 0l-1.188-1.276v-.505l.821-.744-.82-.743.82-.743-.82-.743v-2.66a2.872 2.872 0 112.719 0v6.138l-1.187 1.276zm.68-10.637a.854.854 0 10-1.707-.001.854.854 0 001.708 0z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_5_24">
        <Path fill="#fff" d="M0 0H24V24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SeoKeywork;
