import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const CloseBigIcon = ({ width = Spacing.width41, height = Spacing.width41, color = '#F4C26C' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 41 41" fill="none">

      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.988 10.988c.651-.65 1.706-.65 2.357 0l7.155 7.155 7.155-7.155a1.667 1.667 0 112.357 2.357L22.857 20.5l7.155 7.155a1.667 1.667 0 11-2.357 2.357L20.5 22.857l-7.155 7.155a1.667 1.667 0 11-2.357-2.357l7.155-7.155-7.155-7.155a1.667 1.667 0 010-2.357z"
        fill={color}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CloseBigIcon;
