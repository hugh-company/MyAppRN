import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const ProfileIcon = ({ width = Spacing.width28, height = Spacing.width28, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
      <Path
        d="M14 25.667a11.59 11.59 0 007.863-3.057c-.116-1.097-.816-2.17-2.064-3.01-3.174-2.123-8.4-2.123-11.597 0-1.248.84-1.949 1.913-2.065 3.01A11.59 11.59 0 0014 25.667zm0 0c6.444 0 11.667-5.224 11.667-11.667S20.443 2.333 14 2.333 2.334 7.557 2.334 14 7.557 25.667 14 25.667zm.14-10.757a1.12 1.12 0 00-.28 0 3.814 3.814 0 01-3.686-3.815A3.821 3.821 0 0114 7.268a3.829 3.829 0 013.827 3.827 3.822 3.822 0 01-3.687 3.815z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ProfileIcon;
