import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const StarActiveIcon = ({ width = Spacing.width41, height = Spacing.width41, color = '#6B87F9' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 41 41" fill="none">
      <Path
        d="M20.499 4.667l-5.094 10.398-11.572 1.678 8.383 8.195-2.004 11.395 10.287-5.484 10.289 5.484-1.99-11.395 8.369-8.195-11.508-1.678L20.5 4.667z"
        fill={color}
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default StarActiveIcon;
