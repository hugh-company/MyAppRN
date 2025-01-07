import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const MusicIcon = ({ width = Spacing.width19, height = Spacing.width20, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.72 1.462c.19.15.3.379.3.621v12.034a2.217 2.217 0 01-2.216 2.216H13.26a2.177 2.177 0 010-4.354h2.177V6.3L7.125 8.268V15.7a2.217 2.217 0 01-2.217 2.217H3.76a2.177 2.177 0 110-4.355h1.782V7.66 4.458c0-.366.25-.684.607-.77l9.895-2.375a.792.792 0 01.675.149zm-9.595 5.18l8.312-1.969V3.087L7.125 5.082v1.56zm-1.583 8.504H3.76a.594.594 0 100 1.187h1.148c.35 0 .634-.283.634-.633v-.554zm9.895-1.584H13.26a.594.594 0 100 1.188h1.544c.35 0 .633-.284.633-.633v-.555z"
        fill={color}
      />
    </Svg>
  );
};

export default MusicIcon;
