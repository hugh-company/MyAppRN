import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const PhotographyIcon = ({ width = Spacing.width19, height = Spacing.width20, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.417 2.52a.792.792 0 01.708-.437h4.75c.3 0 .574.17.708.438l.969 1.937h2.677a1.98 1.98 0 011.98 1.98v9.5a1.98 1.98 0 01-1.98 1.979H2.771a1.98 1.98 0 01-1.98-1.98v-9.5a1.98 1.98 0 011.98-1.979h2.677l.969-1.937zm.801 1.938h4.563l-.395-.791H7.614l-.396.791zM2.771 6.042a.396.396 0 00-.396.395v9.5c0 .22.177.396.396.396h13.458a.396.396 0 00.396-.395v-9.5a.396.396 0 00-.396-.396H2.771zm2.77 5.146a3.958 3.958 0 117.917 0 3.958 3.958 0 01-7.916 0zM9.5 8.812a2.375 2.375 0 100 4.75 2.375 2.375 0 000-4.75z"
        fill={color}
      />
    </Svg>
  );
};

export default PhotographyIcon;
