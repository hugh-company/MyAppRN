import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from '../types';
const SupportIcon = ({
  size = Spacing.width24,
  color = '#FF1F44',
}: IconWidthHeightProps) => {
  return (
    <Svg width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M3 11h3a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-5zm0 0a9 9 0 1118 0m0 0v5a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z" />
      <Path d="M21 16v2a4 4 0 01-4 4h-5" />
    </Svg>
  );
};

export default SupportIcon;
