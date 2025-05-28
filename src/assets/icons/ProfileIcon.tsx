import { Spacing } from '@theme';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const ProfileIcon = ({ size = Spacing.width24, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Circle cx={12} cy={12} r={10} />
      <Circle cx={12} cy={10} r={3} />
      <Path d="M7 20.662V19a2 2 0 012-2h6a2 2 0 012 2v1.662" />

    </Svg>
  );
};

export default ProfileIcon;
