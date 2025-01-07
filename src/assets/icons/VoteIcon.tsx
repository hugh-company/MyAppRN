import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const VoteIcon = ({ width = Spacing.width19, height = Spacing.width20, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.938 4.854a3.562 3.562 0 117.125 0V10a3.562 3.562 0 11-7.125 0V4.854zM9.5 2.875a1.98 1.98 0 00-1.98 1.98V10a1.98 1.98 0 103.96 0V4.854A1.98 1.98 0 009.5 2.875zM3.563 8.813c.437 0 .791.354.791.791a5.146 5.146 0 1010.292 0 .792.792 0 111.583 0 6.73 6.73 0 01-5.937 6.683v1.63a.792.792 0 01-1.584 0v-1.63a6.73 6.73 0 01-5.937-6.683c0-.437.354-.791.792-.791z"
        fill={color}
      />
    </Svg>
  );
};

export default VoteIcon;
