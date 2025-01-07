import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const OutDoorIcon = ({ width = Spacing.width19, height = Spacing.width20, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.646 2.875a1.188 1.188 0 100 2.375 1.188 1.188 0 000-2.375zm-2.77 1.187a2.77 2.77 0 115.54 0 2.77 2.77 0 01-5.54 0zm-4.744-.395a.792.792 0 01.724.487L11 11.702l.915-2.744a.792.792 0 011.43-.157l4.75 7.917a.792.792 0 01-.68 1.199H1.584a.792.792 0 01-.725-1.11L6.4 4.142a.792.792 0 01.732-.474zM2.794 16.333h13.224l-3.145-5.241-1.038 3.117a.792.792 0 01-1.482.054L7.107 6.474l-4.313 9.86z"
        fill={color}
      />
    </Svg>
  );
};

export default OutDoorIcon;
