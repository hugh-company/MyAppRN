import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { IconProps } from './types';

const IconNotFound = ({ size = 33, color = '#000001' }: IconProps) => {
  return (
    <Svg width={size} height={size + 1} viewBox="0 0 33 34" fill="none">
      <G clipPath="url(#clip0_1545_14802)">
        <Path
          d="M29.1783 29.8929C29.1783 30.5065 28.9345 31.0949 28.5006 31.5288C28.0668 31.9627 27.4783 32.2064 26.8647 32.2064H6.04291C5.42932 32.2064 4.84086 31.9627 4.40699 31.5288C3.97312 31.0949 3.72937 30.5065 3.72937 29.8929V4.44401C3.72937 3.83042 3.97312 3.24196 4.40699 2.80809C4.84086 2.37422 5.42932 2.13047 6.04291 2.13047H17.6106L29.1783 13.6981V29.8929Z"
          stroke={color}
          strokeWidth="2.31353"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M20.4793 14.8549L10.6699 24.6643"
          stroke={color}
          strokeWidth="2.31353"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.6699 14.8549L20.4793 24.6643"
          stroke={color}
          strokeWidth="2.31353"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1545_14802">
          <Rect
            width="32.3895"
            height="32.3895"
            fill="white"
            x="0.259033"
            y="0.973694"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default IconNotFound;
