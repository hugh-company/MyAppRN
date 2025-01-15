import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const MessageIcon = ({ width = Spacing.width33, height = Spacing.width32, color = '#fff' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 33 32" fill="none">
      <Path
        d="M28.5 15.333a11.173 11.173 0 01-1.2 5.067 11.334 11.334 0 01-10.133 6.267 11.173 11.173 0 01-5.067-1.2L4.5 28l2.533-7.6a11.173 11.173 0 01-1.2-5.067A11.333 11.333 0 0112.1 5.2 11.173 11.173 0 0117.167 4h.666A11.307 11.307 0 0128.5 14.667v.666z"
        fill={color}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MessageIcon;
